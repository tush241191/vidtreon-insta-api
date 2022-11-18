import {Router} from "express";

import ClientService from "../../../../services/client.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import urls from "../../../urls.js";
import buildListResponse from "../responses/list.js";

const router = Router();

router.get(urls.client.list, requireAdminRole, async (req, res) => {
  try {
    const clientList = await ClientService.list();
    const response = buildListResponse(clientList);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch clients list", message: err.message});
  }
});

export default router;
