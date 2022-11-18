import {Router} from "express";

import PurchaseService from "../../../../services/purchase.js";
import {requireSchema} from "../../../middlewares/validate.js";
import {purchaseSchema} from "../../../schemas/token/purchase.js";
import urls from "../../../urls.js";

const router = Router();

// @TODO this endpoint is currently broken, To be fixed in the future
router.post(urls.token.purchase, requireSchema(purchaseSchema), async (req, res) => {
  try {
    const {tonnes: purchaseRequestTonnes} = req.validatedBody;
    //const {productId, tonnes: purchaseRequestTonnes} = req.validatedBody;

    /** Fetch product to link the current price of the product to the purchase */
    //const purchaseProduct = await ProductService.get(productId, true);
    const currentDate = new Date();

    //@TODO decide on the correct way and place to build this data
    const data = {
      facility_id: req.validatedBody.facilityId,
      producer_id: req.validatedBody.producerId,
      user_id: req.validatedBody.userId,
      purpose: req.validatedBody.purpose,
      tonnes: purchaseRequestTonnes,
      // tonne_price: purchaseProduct.price,
      state: "initiated",
      date: currentDate,
      created_at: currentDate,
      updated_at: currentDate
    };

    /** Create purchase order */
    const {id: purchaseId, state: purchaseState} = await PurchaseService.create(data);

    res.json({
      certificateId: purchaseId,
      state: purchaseState
    });
  } catch (error) {
    res.status(400).json({error});
  }
});

export default router;
