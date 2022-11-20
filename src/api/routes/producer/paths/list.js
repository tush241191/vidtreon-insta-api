import {Router} from "express";

import ProducerService from "../../../../services/producer.js";
import {authorizeProducerRequest, requireAdminRole, requireProducerRole} from "../../../middlewares/auth.js";
import urls from "../../../urls.js";
import {buildFacilityMinResponse, buildListResponse} from "../responses/list.js";

const router = Router();
const middlewares = [requireAdminRole]

router.get(urls.producer.list, middlewares, async (req, res) => {
  try {
    const producerList = await ProducerService.list();
    const response = buildListResponse(producerList);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch producer list", message: err.message});
  }
});

export default router;
