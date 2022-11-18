import {Router} from "express";

import {requireSchema, requireValidUuid} from "../../../api/middlewares/validate.js";
import urls from "../../routes.js";
import VehicleService from "../service/vehicleService.js";
import buildVehicleResponseJson from "./response/buildVehicleResponseJson.js";
import {createVehicleSchema} from "./schemas/createVehicleSchema.js";
import {updateVehicleSchema} from "./schemas/updateVehicleSchema.js";

const router = Router();

// Get client vehicles
router.get(urls.client.vehicle.list, async (req, res) => {
  const clientId = req.clientId;
  try {
    const clientVehicles = await VehicleService.getClientCustomerVehicles(clientId)
    res.json(clientVehicles.map(vehicle => buildVehicleResponseJson(vehicle)));
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch client vehicles",
      message: err.message
    });
  }
});

// Create new vehicle
router.post(urls.client.vehicle.create, requireSchema(createVehicleSchema), async (req, res) => {
  const vehicleData = req.validatedBody;
  try {
    const savedVehicle = await VehicleService.saveVehicle(vehicleData);
    res.json(buildVehicleResponseJson(savedVehicle));
  } catch (err) {
    const responseError = {
      error: "Failed to create a customer",
      message: err.message
    };

    res.status(400).json(responseError);
  }
});

// Update vehicle
const updateVehicleMiddlewares = [requireValidUuid, requireSchema(updateVehicleSchema)]
router.put(urls.client.vehicle.update, updateVehicleMiddlewares, async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const vehicleData = req.validatedBody;
    const updatedVehicle = await VehicleService.updateVehicle(vehicleId, vehicleData)

    res.json(updatedVehicle);
  } catch (err) {
    const responseError = {
      error: "Failed to update a vehicle",
      message: err.message
    };

    res.status(400).json(responseError);
  }
});

// Delete customer
router.delete(urls.client.vehicle.delete, requireValidUuid, async (req, res) => {
  const vehicleId = req.params.id;
  try {
    await VehicleService.deleteVehicle(vehicleId)
    res.sendStatus(204);
  } catch (err) {
    if (err.code && err.code === "P2025") {
      return res.status(404).json({
        error: "Failed to delete a vehicle",
        message: "Vehicle to delete not found"
      })
    }
    res.status(400).json({
      error: "Failed to delete a vehicle",
      message: err.message
    });
  }
});

export default router;
