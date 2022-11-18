import {Router} from "express";

import customerRouter from '../../clients/customers/api/router/router.js'
import vehicleRouter from '../../clients/customerVehicles/api/router/router.js'
import customerUrls from '../../clients/routes.js';
import contractRouter from '../../contracts/api/router/router.js'
import contractUrls from '../../contracts/api/router/routes.js'
import {appendIdsToReq, pathUrl, subPathUrl} from "../../utils/router.js";
import {handle404, handleError} from "../middlewares/errors.js";
import urls from "../urls.js";
import clientRouter from "./client/index.js";
import facilityRouter from "./facility/index.js";
import producerRouter from "./producer/index.js";
import tokenRouter from "./token/index.js";
import userRouter from "./user/index.js";

const router = Router();

/**
 * Routes containing all of the defined paths for the API
 */
router.use(pathUrl(urls.client), clientRouter);
router.use(pathUrl(urls.producer), producerRouter);
router.use(pathUrl(urls.facility), facilityRouter);
router.use(pathUrl(urls.token), tokenRouter);
router.use(pathUrl(urls.user), userRouter);
router.use(pathUrl(contractUrls.contract), contractRouter);
router.use(
  pathUrl(customerUrls.client) + subPathUrl(customerUrls.client.customer),
  appendIdsToReq,
  customerRouter
);
router.use(
  pathUrl(customerUrls.client) + subPathUrl(customerUrls.client.vehicle),
  appendIdsToReq,
  vehicleRouter
)

/**
 * Default api path when someone decides to visit it for some reason
 */
router.get("/", async (req, res, next) => {
  res.json({});
});

/**
 * Error handlers
 */
router.use(handle404);
router.use(handleError);

export default router;
