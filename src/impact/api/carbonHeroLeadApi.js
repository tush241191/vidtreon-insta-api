import {Router} from "express";

import urls from "../../api/urls.js";
import {saveCarbonHeroLeadToNotion} from "../service/notionService.js";
import {requireSchema} from "./../../api/middlewares/validate.js";
import {saveCarbonHeroLeadSchema} from "./schemas/saveCarbonHeroLeadSchema.js";

const router = Router();

router.post(urls.client.lead, requireSchema(saveCarbonHeroLeadSchema), async (req, res) => {
  const reqData = req.validatedBody;
  try {
    await saveCarbonHeroLeadToNotion(reqData.email)
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({
      error: "Failed to save Carbon Impact Hero lead",
      message: err.message
    });
  }
});

export default router;
