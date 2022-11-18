import {Router} from "express";

import {requireJwt} from "../../middlewares/auth.js";
import routeList from "./paths/list.js";
import routeName from "./paths/name.js";
import routeSingle from "./paths/single.js";

const router = Router();

router.use(requireJwt);
router.use("/", routeList);       /** ../facility/list/          - GET */
router.use("/", routeSingle);     /** ../facility/:id/           - GET */
router.use("/", routeName);       /** ../facility/name/:name/    - GET */

export default router;
