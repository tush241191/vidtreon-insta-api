import {Router} from "express";

import PurchaseService from "../../../../services/purchase.js";
import {requireValidUuid} from "../../../middlewares/validate.js";
import urls from "../../../urls.js";
import buildCertResponse from "../responses/certificate.js";

const router = Router();

router.get(urls.token.certificate, requireValidUuid, async (req, res, next) => {
  try {
    const purchase = await PurchaseService.get(req.params.id);
    if (purchase) {
      const response = buildCertResponse(purchase);
      res.json(response);
    } else {
      res.status(404).json({error: "Resource not found"});
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({error});
    } else {
      next(error);
    }
  }
});

export default router;
