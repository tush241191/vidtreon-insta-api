import {Router} from "express";

import ProducerService from "../../../../services/producer.js";
import {requireValidUuid} from "../../../middlewares/validate.js";
import urls from "../../../urls.js";
import buildReadResponse from "../responses/read.js";

const router = Router();
const middlewares = [requireValidUuid]

router.get(urls.producer.read, middlewares, async (req, res) => {
  try {
    const producerId = req.params.id;
    const producer = await ProducerService.get(producerId);

    if (!producer) {
      throw new Error(`Producer ${producerId} does not exist`);
    }

    const response = buildReadResponse(producer);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch producer", message: err.message});
  }
});

export default router;
