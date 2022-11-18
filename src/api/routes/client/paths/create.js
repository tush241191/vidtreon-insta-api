import {Router} from "express";

import ClientService from "../../../../services/client.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireSchema} from "../../../middlewares/validate.js";
import {createSchema} from "../../../schemas/client/create.js";
import urls from "../../../urls.js";
import buildCreateResponse from "../responses/create.js";

const router = Router();

const buildClientData = data => {
  return {
    name: data.name,
    data: {
      url: data.url
    },
    is_active: data.isActive
  };
};

router.post(urls.client.create, [requireAdminRole, requireSchema(createSchema)], async (req, res) => {
  const reqData = req.validatedBody;

  try {
    const clientData = buildClientData(reqData);
    const client = await ClientService.create(clientData);

    res.json({
      client: buildCreateResponse(client)
    });
  } catch (err) {
    let responseError = {
      error: "Failed to create a client",
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
