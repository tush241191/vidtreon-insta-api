export const getUserClientIdFromRequest = req => {
  return req.user.linkClient.client_id
};
