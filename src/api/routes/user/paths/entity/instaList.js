import axios from "axios";
import {request, Router} from "express";
import InstaFeedService from "../../../../../services/instaFeed.js";
import buildInstaListResponse from "../../responses/entity/instaList.js";

import UserService from "../../../../../services/user.js";
import { requireValidUuid } from "../../../../middlewares/validate.js";
import urls from "../../../../urls.js";

const router = Router();
const middlewares = [requireValidUuid]


router.get(urls.user.entity.instaList, middlewares, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.get(userId);

    if (!user) {
      throw new Error(`User ${userId} does not exist`);
    }

    const list = await InstaFeedService.fetchInstaFeeds(userId)
    const response = buildInstaListResponse(list);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch insta feeds list", message: err.message});
  }
});

export default router;
