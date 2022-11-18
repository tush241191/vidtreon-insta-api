import {Router} from "express";

import {USER_ROLE_ADMIN, USER_ROLE_CLIENT} from "../../../../../services/constants/user.js";
import PurchaseService from "../../../../../services/purchase.js";
import UserService from "../../../../../services/user.js";
import urls from "../../../../urls.js";
import buildContribution from "../../responses/entity/contributions.js";

const router = Router();

const setContributorUserId = req => {
  if (req.user.role === USER_ROLE_ADMIN) {
    return req.params.id;
  }

  return req.user.id;
};

router.get(urls.user.entity.contributions, async (req, res) => {
  try {
    if (req.user.role === USER_ROLE_CLIENT && req.user.id !== req.params.id) {
      throw new Error("You can fetch only your own contributions");
    }

    const userId = setContributorUserId(req);
    const user = await UserService.get(userId);

    if(!user) {
      throw new Error("User does not exist");
    }

    const userPurchases = await PurchaseService.userList(user.id);
    const response = userPurchases.map(buildContribution);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch contributions", message: err.message});
  }
});

export default router;
