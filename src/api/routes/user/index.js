import {Router} from "express";

import {requireAdminRole, requireJwt} from "../../middlewares/auth.js";
import routeCreate from "./paths/entity/create.js";
import routeDelete from "./paths/entity/delete.js";
import routeList from "./paths/entity/list.js";
import routeLogin from "./paths/entity/login.js";
import routeLogout from "./paths/entity/logout.js";
import routeRead from "./paths/entity/read.js";
import routeUpdate from "./paths/entity/update.js";
import routeValidate from "./paths/entity/validate.js";

const router = Router();

router.use("/", routeLogin);            /** ../user/login/ - POST */

router.use(requireJwt);
router.use("/", routeValidate);         /** ../user/validate/ - GET */
router.use("/", routeLogout);           /** ../user/logout/ - POST */

router.use(requireAdminRole);

/** Single Entity Routes */
router.use("/", routeCreate);           /** ../user/create/ - POST */
router.use("/", routeDelete);           /** ../user/:id/ - DELETE */
router.use("/", routeList);             /** ../user/list/ - GET */
router.use("/", routeRead);             /** ../user/:id/ - GET */
router.use("/", routeUpdate);           /** ../user/:id/ - PATCH */

export default router;
