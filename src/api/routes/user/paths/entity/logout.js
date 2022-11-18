import {Router} from "express";

import UserService from "../../../../../services/user.js";
import urls from "../../../../urls.js";

const router = Router();

router.post(urls.user.entity.logout, async (req, res) => {
  await UserService.regenerateRefreshId(req.user);
  res.status(204).send();
});

export default router;
