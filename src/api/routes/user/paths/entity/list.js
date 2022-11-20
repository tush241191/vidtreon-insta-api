import {Router} from "express";

import UserService from "../../../../../services/user.js";
import urls from "../../../../urls.js";
import buildListResponse from "../../responses/entity/list.js";

const router = Router();

router.get(urls.user.entity.list, async (req, res) => {
  try {
    const userList = await UserService.list();
    const response = buildListResponse(userList);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch users list", message: err.message});
  }
});

export default router;
