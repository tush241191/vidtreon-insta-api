import {Router} from "express";

import carbonHeroLeadApi from "../../../impact/api/carbonHeroLeadApi.js";
import impact from "../../../impact/api/impactApi.js";
import {requireJwt} from "../../middlewares/auth.js";
import routeCreate from "./paths/create.js";
import routeDelete from "./paths/delete.js";
import routeList from "./paths/list.js";
import routeRead from "./paths/read.js";
import routeUpdate from "./paths/update.js";

const router = Router();
router.use("/", impact);
router.use("/", carbonHeroLeadApi);

router.use(requireJwt);
router.use("/", routeCreate);     /** ../client/create/ - POST */
router.use("/", routeDelete);     /** ../client/:id/    - DELETE */
router.use("/", routeList);       /** ../client/list/   - GET */
router.use("/", routeRead);       /** ../client/:id/    - GET */
router.use("/", routeUpdate);     /** ../client/:id/    - PATCH */

export default router;
