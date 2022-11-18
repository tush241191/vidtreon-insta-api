import {Router} from "express";

import urls from "../../routes.js";
import VehicleDataService from "../service/vehicleDataService.js";

const router = Router();

// TODO WIP
// Get vehicle data
router.get(urls.client.vehicle.data, async (req, res) => {
  const licensePlate = req.params.licensePlate
  try {
    const vehicleData = await VehicleDataService.getVehicleData(licensePlate)
    res.json(vehicleData)
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch vehicle data",
      message: err.message
    });
  }
});

export default router;
