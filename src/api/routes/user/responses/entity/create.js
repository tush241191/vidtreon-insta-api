import {USER_ROLE_CLIENT, USER_ROLE_PRODUCER} from "../../../../../services/constants/user.js";

const buildCreateResponse = user => {
  const userData = {
    id: user.id,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    firstName: user.first_name,
    lastName: user.last_name,
    instaToken: user.insta_token,
    country: user.data.country,
    position: user.data.position
  };

  return userData;
};

export default buildCreateResponse;
