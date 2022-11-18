import find from "lodash/find.js";

import {VERIFICATION_STEP_AGREEMENT, VERIFICATION_STEP_INITIATED} from "../../../../../services/constants/producer.js";
import {USER_ROLE_CLIENT, USER_ROLE_PRODUCER} from "../../../../../services/constants/user.js";

const buildUserResponse = user => {
  if (user) {
    const userData = {
      id: user.id,
      userName: user.email, //@TODO perhaps we could refactor this out and just use email from the payload
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      country: user.data.country,
      position: user.data.position,
      isActive: user.is_active,
      lastLoginAt: user.last_login_at
    };

    const clientData = {
      id: user.linkClient?.client?.id,
      name: user.linkClient?.client?.name,
      type: user.linkClient?.client?.type
    };

    const producerData = {
      id: user.linkProducer?.producer?.id,
      name: user.linkProducer?.producer?.name,
      isVerified: user.linkProducer?.producer?.is_verified,
      ...user.linkProducer?.producer?.is_verified === false && {
        verificationStepsCompleted: {
          [VERIFICATION_STEP_INITIATED]: find(user.linkProducer.producer.logs, ['event', VERIFICATION_STEP_INITIATED]),
          [VERIFICATION_STEP_AGREEMENT]: find(user.linkProducer.producer.logs, ['event', VERIFICATION_STEP_AGREEMENT])
        }
      }
    };

    return {
      ...userData,
      ...user.role === USER_ROLE_CLIENT && {client: clientData},
      ...user.role === USER_ROLE_PRODUCER && {producer: producerData}
    };
  }

  return {};
};

export default buildUserResponse;
