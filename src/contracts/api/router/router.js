import {Router} from "express";

import {requireJwt} from "../../../api/middlewares/auth.js";
import contractsApi from "../contractsApi.js";

const router = Router();

router.use(requireJwt);
router.use("/", contractsApi);

export default router;
