import { create } from "zustand";
import { Record } from "../../../server/types";
type Store = {
  data: Record[];
  set: (data: Record[]) => void;
  add: (data: Record) => void;
  delete: (id: number) => void;
};

const useRecordStore = create<Store>((set) => ({
  data: [],
  set: (data: Record[]) => set(() => ({ data })),
  add: (data: Record) => set((state) => ({ data: [data, ...state.data] })),
  delete: (id: number) =>
    set((state) => ({ data: state.data.filter((el) => el.id != id) })),
}));

export default useRecordStore;
