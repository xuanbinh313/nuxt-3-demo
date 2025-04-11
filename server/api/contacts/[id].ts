import { deleteContact, getContact, updateContact } from "~/utils/data";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ status: 404, statusMessage: "Not found" });
  }
  if (method === "DELETE") {
    await deleteContact(id);
    return { message: "Deleted successfully" };
  }
  if (method === "GET") {
    // delay for 500ms second to simulate a slow network
    return new Promise((resolve) =>
      setTimeout(async () => {
        const response = await getContact(id);
        if (!response) {
          throw createError({ status: 404, statusMessage: "Not found" });
        }
        resolve(response);
      }, 1000)
    );
    // get contact by id
    // const contact = contacts.find((contact) => contact.id === id)
  }

  if (method === "PUT") {
    const body = await readBody(event);
    const updatedContact = await updateContact(id, body);
    return updatedContact;
  }
});
