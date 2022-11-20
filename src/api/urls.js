export default {
  apiPrefix: "/v1",
  producer: {
    path: "/producer",
    list: "/list",
    create: "/create",
    read: "/:id",
    update: "/:id",
    delete: "/:id",
    verify: "/:id/verify",
    facilities: "/:id/facilities"
  },
  user: {
    path: "/user",
    entity: {
      create: "/create",
      list: "/list",
      read: "/:id",
      update: "/:id",
      delete: "/:id",
      login: "/login",
      logout: "/logout",
      validate: "/validate"
    }
  }
};
