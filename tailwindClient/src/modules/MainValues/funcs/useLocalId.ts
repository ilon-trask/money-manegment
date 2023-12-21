import client from "../../../lib/trpc";

export default async function useLocalId() {
  const id = localStorage.getItem("id");

  if (id) {
    return id;
  } else {
    const newId = await client.generalDataRoute.generateId.query();
    localStorage.setItem("id", newId);
    return newId;
  }
}
