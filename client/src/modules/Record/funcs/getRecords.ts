import client from "../../../funcs/trpc";
import useFormattedRecordData from "../../../funcs/useFormattedRecordData";

export default async function getRecords(generalDataId: string) {
  const recordData = await client.recordRouter.getAllMy.query({
    generalDataId: generalDataId,
  });
  const formattedRecordData = recordData.map((el) =>
    useFormattedRecordData(el as any)
  );
  return formattedRecordData;
}
