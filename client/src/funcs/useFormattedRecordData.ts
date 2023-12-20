import { Record } from "../../../server/types";

const useFormattedRecordData = (recordData: Record) => {
  const formattedRecordData: Record = {
    ...recordData,
    createdAt: new Date(recordData.createdAt),
  };
  return formattedRecordData;
};

export default useFormattedRecordData;
