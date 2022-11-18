import {Router} from "express";

import {requireJwt} from "../../middlewares/auth.js";
import routeCertificate from "./paths/certificate.js";
import routePurchase from "./paths/purchase.js";

const router = Router();

router.use("/", routeCertificate);    /** ../token/certificate/:id/   - GET */

router.use(requireJwt);
router.use("/", routePurchase);       /** ../token/purchase/          - POST */

export default router;
