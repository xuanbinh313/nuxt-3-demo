import { createEmptyContact, getContacts } from "~/utils/data";
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  if (method === "GET") {
    const response = await getContacts(query.q as string | null);
    return response;
  }

  if (method === "POST") {
    const contact = await createEmptyContact();
    setResponseStatus(event, 201)
    return contact;
  }

});
