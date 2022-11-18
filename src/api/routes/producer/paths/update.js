import {Router} from "express";

import ProducerService from "../../../../services/producer.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireSchema, requireValidUuid} from "../../../middlewares/validate.js";
import {updateSchema} from "../../../schemas/producer/update.js";
import urls from "../../../urls.js";
import buildUpdateResponse from "../responses/update.js";

const router = Router();

const buildProducerData = payload => {
  const isObjEmpty = obj => Object.keys(obj).length === 0;
  const booleanKeyPresent = key => key !== undefined;

  const legalData = payload.data?.legal;
  const informativeData = payload.data?.informative;
  const payloadData = {
    ...legalData && {
      legal: {
        ...legalData.name && {name: legalData.name},
        ...legalData.address && {address: legalData.address},
        ...legalData.code && {code: legalData.code}
      }
    },
    ...informativeData && {
      informative: {
        ...informativeData.tagline && {tagline: informativeData.tagline},
        ...informativeData.description && {description: informativeData.description},
        ...informativeData.field && {field: informativeData.field},
        ...informativeData.goal && {goal: informativeData.goal}
      }
    }
  };

  const producerData = {
    ...payload.name && {name: payload.name},
    ...payload.url && {url: payload.url},
    ...payload.constant && {constant: payload.constant},
    ...booleanKeyPresent(payload.isActive) && {is_active: payload.isActive}
  };

  return {
    ...producerData,
    ...!isObjEmpty(payloadData) && {data: payloadData}
  };
};

const middlewares = [requireAdminRole, requireValidUuid, requireSchema(updateSchema)]

router.patch(urls.producer.update, middlewares, async (req, res) => {
  const reqData = req.validatedBody;

  try {
    const producerId = req.params.id;
    const producerData = buildProducerData(reqData);

    const producer = await ProducerService.update(producerId, producerData);

    res.json({
      producer: buildUpdateResponse(producer)
    });
  } catch (err) {
    let responseError = {
      error: "Failed to update a producer",
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
