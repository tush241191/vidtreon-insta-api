import {Router} from "express";

import ClientService from "../../../../services/client.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireSchema, requireValidUuid} from "../../../middlewares/validate.js";
import {updateSchema} from "../../../schemas/client/update.js";
import urls from "../../../urls.js";
import buildUpdateResponse from "../responses/update.js";

const router = Router();

const buildClientData = data => {
  const booleanKeyPresent = key => key !== undefined;

  return {
    ...data.name && {name: data.name},
    ...booleanKeyPresent(data.isActive) && {is_active: data.isActive},
    ...data.url && {data: {url: data.url}}
  };
};

router.patch(urls.client.update, [requireAdminRole, requireSchema(updateSchema)], requireValidUuid, async (req, res) => {
  const reqData = req.validatedBody;

  try {
    const clientId = req.params.id;
    const clientData = buildClientData(reqData);
    const client = await ClientService.update(clientId, clientData);

    res.json({
      client: buildUpdateResponse(client)
    });
  } catch (err) {
    let responseError = {
      error: "Failed to update a client",
      message: err.message
    };

    if (err.code && err.code === "P2002") {
      responseError = {
        error: `${err.details.target} field has to be unique`
      };
    }

    res.status(400).json(responseError);
  }
});

export default router;
