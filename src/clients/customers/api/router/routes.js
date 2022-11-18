export default {
  client: {
    path: "/client/:clientId",
    customer: {
      path: "/customer",
      list: "/list",
      create: "/create",
      read: "/:id",
      update: "/:id",
      delete: "/:id"
    }
  }
}
