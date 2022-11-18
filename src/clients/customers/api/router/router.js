import {Router} from "express";

import {authorizeClientRequest, requireClientRole, requireJwt} from "../../../../api/middlewares/auth.js";
import customerApi from "../customerApi.js";

const router = Router();

router.use(requireJwt);
router.use(authorizeClientRequest);
router.use(requireClientRole);
router.use("/", customerApi);

export default router;
