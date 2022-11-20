import {Router} from "express";

import {pathUrl} from "../../utils/router.js";
import {handle404, handleError} from "../middlewares/errors.js";
import urls from "../urls.js";
import producerRouter from "./producer/index.js";
import userRouter from "./user/index.js";

const router = Router();

/**
 * Routes containing all of the defined paths for the API
 */
router.use(pathUrl(urls.producer), producerRouter);
router.use(pathUrl(urls.user), userRouter);

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
