import {Router} from "express";

import urls from "../../../../urls.js";
import buildUserResponse from "../../responses/entity/user.js";

const router = Router();

router.get(urls.user.entity.validate, async (req, res) => {
  res.json({
    user: buildUserResponse(req.user)
  });
});

export default router;
