export default {
  apiPrefix: "/v1",
  facility: {
    path: "/facility",
    list: "/list",
    single: "/:id",
    singleName: "/name/:name"
  },
  token: {
    path: "/token",
    purchase: "/purchase",
    certificate: "/certificate/:id"
  },
  client: {
    path: "/client",
    list: "/list",
    create: "/create",
    read: "/:id",
    update: "/:id",
    delete: "/:id",
    impact: "/impact/vehicle/:identifier",
    lead: "/impact/vehicle/lead"
  },
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
    collection: {
      list: "/list",
      contributions: '/contributions'
    },
    entity: {
      create: "/create",
      read: "/:id",
      update: "/:id",
      delete: "/:id",
      login: "/login",
      logout: "/logout",
      validate: "/validate",
      contributions: "/:id/contributions"
    }
  }
};
