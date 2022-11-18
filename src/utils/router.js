import urls from "../api/urls.js";

export const pathUrl = ({path}) => urls.apiPrefix + path

export const subPathUrl = ({path}) => path

export const appendIdsToReq = (req, res, next) => {
  req.clientId = req.params.clientId;
  req.customerId = req.params.customerId;
  next();
}
