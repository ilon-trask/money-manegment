import { GeneralData } from "../../../../../../../server/types";
import client from "../../../../../lib/trpc";
import useFormattedRecordData from "../../../../../funcs/useFormattedRecordData";
import { CreateRecordType } from "../CreateRecord";

export default async function useCreateRecord(
  createRecordData: CreateRecordType,
  generalData: GeneralData
) {
  const recordData = await client.recordRouter.create.mutate({
    ...createRecordData,
    sum: +createRecordData.sum,
    generalDataId: generalData.id,
  });

  const formattedRecordData = useFormattedRecordData(recordData as any);
  return formattedRecordData;
}
