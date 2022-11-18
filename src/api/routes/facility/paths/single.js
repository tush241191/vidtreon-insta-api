import {Router} from "express";

import ProducerFacilityService from "../../../../services/producerFacility.js";
import {requireValidUuid} from "../../../middlewares/validate.js";
import urls from "../../../urls.js";
import buildSingleFacilityResponse from "../responses/single.js";

const router = Router();

router.get(urls.facility.single, requireValidUuid, async (req, res, next) => {
  try {
    const facility = await ProducerFacilityService.get(req.params.id);
    if (facility) {
      const response = buildSingleFacilityResponse(facility);
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
