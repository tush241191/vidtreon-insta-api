import {Router} from "express";

import {requireJwt} from "../../middlewares/auth.js";
import routeCreate from "./paths/create.js";
import routeDelete from "./paths/delete.js";
import routeList from "./paths/list.js";
import routeRead from "./paths/read.js";
import routeUpdate from "./paths/update.js";

const router = Router();

router.use(requireJwt);

/** ADMIN endpoints */
router.use("/", routeCreate);       /** ../producer/create/  - POST */
router.use("/", routeDelete);       /** ../producer/:id/     - DELETE */
router.use("/", routeList);         /** ../producer/list/    - GET */
router.use("/", routeRead);         /** ../producer/:id/     - GET */
router.use("/", routeUpdate);       /** ../producer/:id/     - PATCH */

export default router;