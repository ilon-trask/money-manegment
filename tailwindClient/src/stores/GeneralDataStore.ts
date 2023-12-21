import { create } from "zustand";
import { GeneralData, Record } from "../../../server/types";

type Store = {
  data: GeneralData;
  changeBalanceOnCreateRecord: (recordData: Record) => void;
  changeBalanceOnDeleteRecord: (recordData: Record) => void;
  setValue: (data: GeneralData) => void;
};

const useGeneralDataStore = create<Store>((set) => ({
  data: { id: "", balance: 0, salary: 0 },
  changeBalanceOnCreateRecord: (recordData: Record) =>
    set((state) => {
      state.data.balance =
        recordData.type == "minus"
          ? state.data.balance - recordData.sum
          : state.data.balance + recordData.sum;
      return { ...state };
    }),
  changeBalanceOnDeleteRecord: (recordData: Record) =>
    set((state) => {
      state.data.balance =
        recordData.type == "minus"
          ? state.data.balance + recordData.sum
          : state.data.balance - recordData.sum;
      return { ...state };
    }),
  setValue: (data: GeneralData) => set(() => ({ data })),
}));

export default useGeneralDataStore;
