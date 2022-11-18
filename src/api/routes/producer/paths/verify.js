import {Router} from "express";

import {VERIFICATION_STEP_AGREEMENT, VERIFICATION_STEP_INITIATED} from "../../../../services/constants/producer.js";
import ProducerService from "../../../../services/producer.js";
import ProducerLogService from "../../../../services/producerLog.js";
import {requireProducerRole} from "../../../middlewares/auth.js";
import {requireSchema, requireValidUuid} from "../../../middlewares/validate.js";
import {verifySchema} from "../../../schemas/producer/verify.js";
import urls from "../../../urls.js";
import buildVerifyResponse from "../responses/verify.js";

const router = Router();
const middlewares = [requireProducerRole, requireValidUuid, requireSchema(verifySchema)];

const checkIfPrerequisiteEventsLogged = async ({producerId, step}) => {
  const prerequisiteStepEventsMap = {
    [VERIFICATION_STEP_INITIATED]: [],
    [VERIFICATION_STEP_AGREEMENT]: [VERIFICATION_STEP_INITIATED]
  }

  const requiredEvents = await Promise.all(
    prerequisiteStepEventsMap[step].map(async event => {
      return await ProducerLogService.get({producerId, event})
    })
  );

  return requiredEvents.every(event => {
    return event;
  });
}

const isEventDateValid = date => {
  const oneHour = 60 * 60 * 1000;
  const currentDate = new Date();
  const dateDiff = currentDate - date;

  /** Date not in the future && not more than 1 hour in the past */
  return !(date > currentDate) && dateDiff < oneHour;
}

const recordEventLog = async data => {
  const producerLog = await ProducerLogService.create(data)

  if(data.event === VERIFICATION_STEP_AGREEMENT) {
    await ProducerService.verify(data.producerId)
  }

  return producerLog;
}

router.post(urls.producer.verify, middlewares, async (req, res) => {
  try {
    const producerId = req.params.id;
    const producer = await ProducerService.get(producerId);

    if (!producer) {
      throw new Error(`Producer ${producerId} does not exist`);
    }

    const verificationEvent = req.validatedBody.step;
    const verificationEventDate = new Date(req.validatedBody.date)

    const isDateValid = isEventDateValid(verificationEventDate)
    if (!isDateValid) {
      throw new Error(`Provided verification date is invalid.`);
    }

    const isStepCompleted = await ProducerLogService.get({producerId, event: verificationEvent});
    if (isStepCompleted) {
      throw new Error(`Current producer verification step has already been completed`);
    }

    const isStepsSequenceCorrect = await checkIfPrerequisiteEventsLogged({producerId, step: verificationEvent});
    if (!isStepsSequenceCorrect) {
      throw new Error(`Current producer verification step expected previous steps to be completed`);
    }

    const eventLog = await recordEventLog({
      producerId: producerId,
      event: verificationEvent,
      createdBy: req.user.id,
      createdAt: verificationEventDate
    })

    const response = buildVerifyResponse(eventLog);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to verify producer", message: err.message});
  }
});

export default router;
