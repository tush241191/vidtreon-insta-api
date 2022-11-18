import {Router} from "express";

import ClientService from "../../../../services/client.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireValidUuid} from "../../../middlewares/validate.js";
import urls from "../../../urls.js";
import buildReadResponse from "../responses/read.js";

const router = Router();

router.get(urls.client.read, [requireAdminRole, requireValidUuid], async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await ClientService.get(clientId);

    if (!client) {
      throw new Error(`Client ${clientId} does not exist`);
    }

    const response = buildReadResponse(client);
    res.json(response);
  } catch (err) {
    res.status(400).json({
      error: "Failed to fetch client",
      message: err.message
    });
  }
});

export default router;
