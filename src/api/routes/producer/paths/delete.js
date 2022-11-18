import {Router} from "express";

import ProducerService from "../../../../services/producer.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireValidUuid} from "../../../middlewares/validate.js";
import urls from "../../../urls.js";
import buildDeleteResponse from "../responses/delete.js";

const router = Router();
const middlewares = [requireAdminRole, requireValidUuid]

router.delete(urls.producer.delete, middlewares, async (req, res) => {
  try {
    const producerId = req.params.id;

    /** Disable Producer and deactivate all of the related facilities */
    const producer = await ProducerService.delete(producerId);

    res.status(200).send(buildDeleteResponse(producer));
  } catch (err) {
    let responseErrMessage = err.message;

    if (err.code && err.code === "P2025") {
      responseErrMessage = "Producer to delete not found";
    }

    res.status(400).json({
      error: "Failed to delete a producer",
      message: responseErrMessage
    });
  }
});

export default router;
