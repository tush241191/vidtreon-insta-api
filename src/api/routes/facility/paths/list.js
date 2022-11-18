import {Router} from "express";

import ProducerFacilityService from "../../../../services/producerFacility.js";
import urls from "../../../urls.js";
import {buildFacilityResponse} from "../responses/list.js";

const router = Router();

router.get(urls.facility.list, async (req, res, next) => {
  try {
    const facilities = await ProducerFacilityService.list();
    const response = facilities.map(buildFacilityResponse);
    res.json(response);
  } catch (error) {
    res.status(400).json({error});
  }
});

export default router;
