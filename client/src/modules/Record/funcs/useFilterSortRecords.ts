import { Record } from "../../../../../server/types";
export type RecordFilterType = "plus" | "minus" | "";
export type RecordSortType = "alfUp" | "alfDown" | "sumUp" | "sumDown" | "";
export default function useFilterSortRecords(
  filter: RecordFilterType,
  sort: RecordSortType,
  recordData: Record[]
) {
  if (filter) {
    return recordData.filter((el) => el.type == filter);
  } else if (sort) {
    const localRecordData: Record[] = JSON.parse(JSON.stringify(recordData));
    switch (sort) {
      case "alfDown":
        return localRecordData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alfUp":
        return localRecordData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "sumDown":
        return localRecordData.sort((a, b) => b.sum - a.sum);
        break;
      case "sumUp":
        return localRecordData.sort((a, b) => a.sum - b.sum);
        break;
    }
  }
  return recordData;
}
