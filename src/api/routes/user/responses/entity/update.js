import {USER_ROLE_CLIENT, USER_ROLE_PRODUCER} from "../../../../../services/constants/user.js";

const buildUpdateResponse = user => {
  const userData = {
    id: user.id,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    firstName: user.first_name,
    lastName: user.last_name,
    country: user.data.country,
    position: user.data.position
  };

  const clientData = {
    id: user.linkClient?.client?.id,
    name: user.linkClient?.client?.name
  };

  const producerData = {
    id: user.linkProducer?.producer?.id,
    name: user.linkProducer?.producer?.name
  };

  return {
    ...userData,
    ...user.role === USER_ROLE_CLIENT && {client: clientData},
    ...user.role === USER_ROLE_PRODUCER && {producer: producerData}
  };
};

export default buildUpdateResponse;
