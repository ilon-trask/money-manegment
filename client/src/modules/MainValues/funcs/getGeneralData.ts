import client from "../../../funcs/trpc";

export default async function getGeneralData(generalDataId: string) {
  const generalData = await client.generalDataRoute.get.query({
    id: generalDataId,
  });
  return generalData;
}
