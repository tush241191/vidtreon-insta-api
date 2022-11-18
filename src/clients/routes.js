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
    },
    vehicle: {
      path: "/vehicle",
      data: "/data/:licensePlate",
      list: "/list",
      create: "/create",
      read: "/:id",
      update: "/:id",
      delete: "/:id"
    }
  }
}
