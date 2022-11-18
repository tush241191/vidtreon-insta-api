import {Router} from "express";

import UserService from "../../../../../services/user.js";
import {requireValidUuid} from "../../../../middlewares/validate.js";
import urls from "../../../../urls.js";
import buildUserResponse from "../../responses/entity/user.js";

const router = Router();

router.get(urls.user.entity.read, requireValidUuid, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.get(userId);

    if (!user) {
      throw new Error(`User ${userId} does not exist`);
    }

    const response = buildUserResponse(user);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch user", message: err.message});
  }
});

export default router;
