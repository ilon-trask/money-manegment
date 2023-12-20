import {
  Record as PrismaRecord,
  GeneralData as PrismaGeneralData,
} from "@prisma/client";
export type Record = Omit<PrismaRecord, "type"> & {
  type: "minus" | "plus";
};

export type GeneralData = PrismaGeneralData;
