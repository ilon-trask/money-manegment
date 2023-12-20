import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import prisma from "./prisma";
import { v4 as uuidv4 } from "uuid";

export const generalDataRoute = router({
  generateId: publicProcedure.query(async () => {
    return uuidv4();
  }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const data = await prisma.generalData.findFirst({
        where: { id: input.id },
      });
      return data;
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        balance: z.number(),
        salary: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const data = await prisma.generalData.create({
        data: { id: input.id, balance: input.balance, salary: input.salary },
      });
      return data;
    }),
});
