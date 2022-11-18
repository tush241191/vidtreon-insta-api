import {Router} from "express";

import UserService from "../../../../../services/user.js";
import {requireValidUuid} from "../../../../middlewares/validate.js";
import urls from "../../../../urls.js";

const router = Router();

router.delete(urls.user.entity.delete, requireValidUuid, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.delete(userId);
    res.status(200).send({user: {id: user.id}});
  } catch (err) {
    let responseErrMessage = err.message;

    if (err.code && err.code === "P2025") {
      responseErrMessage = "User to delete not found";
    }

    res
      .status(400)
      .json({error: "Failed to delete a user", message: responseErrMessage});
  }
});

export default router;
