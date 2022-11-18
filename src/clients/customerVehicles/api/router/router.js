import {Router} from "express";

import {authorizeClientRequest, requireClientRole, requireJwt} from "../../../../api/middlewares/auth.js";
import vehicleApi from "../vehicleApi.js";
import vehicleDataApi from "../vehicleDataApi.js";

const router = Router();

router.use(requireJwt);
router.use(requireClientRole);
router.use(authorizeClientRequest);
router.use("/", vehicleApi);
router.use("/", vehicleDataApi);

export default router;
