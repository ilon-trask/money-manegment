import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import prisma from "./prisma";
import { Record } from "./types";
const createType = z.object({
  name: z.string(),
  type: z.enum(["minus", "plus"]),
  sum: z.number(),
  generalDataId: z.string(),
});

const editType = createType.extend({
  id: z.string(),
});

const formatRecordData = (recordData: Record) => {
  const formattedRecordData: Record = {
    ...recordData,
    type: recordData.type == "minus" ? "minus" : "plus",
    createdAt: new Date(recordData.createdAt),
  };
  return formattedRecordData;
};

export const recordRouter = router({
  getAllMy: publicProcedure
    .input(z.object({ generalDataId: z.string() }))
    .query(async ({ input }) => {
      const recordsData = await prisma.record.findMany({
        where: { generalDataId: input.generalDataId },
        orderBy: { createdAt: "desc" },
      });
      const formattedRecordsData = recordsData.map((el) =>
        formatRecordData(el as any)
      );
      return formattedRecordsData;
    }),

  create: publicProcedure.input(createType).mutation(async ({ input }) => {
    const generalData = await prisma.generalData.findFirst({
      where: { id: input.generalDataId },
    });
    if (!generalData) throw new Error("No general data");
    const balance =
      input.type == "minus"
        ? generalData.balance - input.sum
        : generalData.balance + input.sum;

    await prisma.generalData.update({
      data: { balance },
      where: { id: input.generalDataId },
    });
    const recordData = await prisma.record.create({
      data: { ...input },
    });
    const formattedRecordData = formatRecordData(recordData as any);
    return formattedRecordData;
  }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const recordData = await prisma.record.findFirst({
        where: { id: input.id },
      });

      if (!recordData) throw new Error("no recordData");
      const generalData = await prisma.generalData.findFirst({
        where: { id: recordData.generalDataId },
      });

      if (!generalData) throw new Error("No general data");

      const balance =
        recordData.type == "minus"
          ? generalData.balance + recordData.sum
          : generalData.balance - recordData.sum;

      await prisma.generalData.update({
        data: { balance },
        where: { id: recordData.generalDataId },
      });

      const res = await prisma.record.delete({ where: { id: input.id } });
      return res;
    }),
});
