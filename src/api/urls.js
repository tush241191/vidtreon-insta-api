export default {
  apiPrefix: "/v1",
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
      validate: "/validate",
      fetch: "/:id/fetch",
      feeds: "/:tenant/feeds",
      instaList: "/:id/insta"
    }
  }
};
