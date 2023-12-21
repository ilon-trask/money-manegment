import client from "../../../lib/trpc";

export default async function getGeneralData(generalDataId: string) {
  const generalData = await client.generalDataRoute.get.query({
    id: generalDataId,
  });
  return generalData;
}
