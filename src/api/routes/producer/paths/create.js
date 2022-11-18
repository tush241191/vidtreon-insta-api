import {Router} from "express";

import ProducerService from "../../../../services/producer.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireSchema} from "../../../middlewares/validate.js";
import {createSchema} from "../../../schemas/producer/create.js";
import urls from "../../../urls.js";
import buildCreateResponse from "../responses/create.js";

const router = Router();

const buildProducerData = payload => {
  return {
    name: payload.name,
    url: payload.url,
    constant: payload.constant,
    data: {
      legal: payload.data.legal,
      informative: payload.data.informative
    },
    is_active: payload.isActive
  };
};

const middlewares = [requireAdminRole, requireSchema(createSchema)]

router.post(urls.producer.create, middlewares, async (req, res) => {
  const reqData = req.validatedBody;

  try {
    const producerData = buildProducerData(reqData);
    const producer = await ProducerService.create(producerData);

    res.json({
      producer: buildCreateResponse(producer)
    });
  } catch (err) {
    let responseError = {
      error: "Failed to create a producer",
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
