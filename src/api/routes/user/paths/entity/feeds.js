import {Router} from "express";

import InstaFeedService from "../../../../../services/instaFeed.js";
import UserService from "../../../../../services/user.js";
import urls from "../../../../urls.js";
import buildInstaListResponse from "../../responses/entity/instaList.js";

const router = Router();

router.get(urls.user.entity.feeds, async (req, res) => {
  try {
    const tenant = req.params.tenant;
    const user = await UserService.getByTenant(tenant);

    if (!user) {
      throw new Error(`User '${tenant}' does not exist`);
    }

    const list = await InstaFeedService.fetchInstaFeeds(user.id)
    const response = buildInstaListResponse(list);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch insta feeds list", message: err.message});
  }
});

export default router;
