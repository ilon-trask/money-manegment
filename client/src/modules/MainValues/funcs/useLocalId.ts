import client from "../../../funcs/trpc";

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
