import {Router} from "express";

import urls from "../../api/urls.js";
import ImpactService from '../service/impactService.js';
import buildImpactResponse from "./response/impactResponseBuilder.js";

const router = Router();

router.get(urls.client.impact, async (req, res) => {
  try {
    const identifier = req.params.identifier;

    const vehicle = await ImpactService.getCarbonHeroVehicle(identifier)
    if (!vehicle) {
      res.status(404).json({
        error: "Vehicle not found",
        message: "Vehicle not found"
      });
      return;
    }

    res.json(buildImpactResponse(vehicle));
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch vehicle",
      message: err.message
    });
  }
});

export default router;
