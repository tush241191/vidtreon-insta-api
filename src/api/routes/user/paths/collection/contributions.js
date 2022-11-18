import {Router} from "express";

import PurchaseService from "../../../../../services/purchase.js";
import urls from "../../../../urls.js";
import buildContributionsResponse from "../../responses/colleciton/contributions.js";

const router = Router();

router.get(urls.user.collection.contributions, async (req, res) => {
  try {
    const userPurchases = await PurchaseService.list();
    const response = buildContributionsResponse(userPurchases);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch contributions", message: err.message});
  }
});

export default router;
