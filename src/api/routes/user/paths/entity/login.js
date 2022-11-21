import {Router} from "express";
import jsonwebtoken from "jsonwebtoken";

import {
  USER_AUTH_ORIGIN_ADMIN,
  USER_AUTH_ORIGIN_APP, USER_AUTH_ORIGIN_PRODUCER,
  USER_ROLE_ADMIN,
  USER_ROLE_CLIENT, USER_ROLE_PRODUCER
} from "../../../../../services/constants/user.js";
import UserService from "../../../../../services/user.js";
import {requireSchema} from "../../../../middlewares/validate.js";
import {loginSchema} from "../../../../schemas/user/login.js";
import urls from "../../../../urls.js";
import buildUserResponse from "../../responses/entity/user.js";

const router = Router();

const validateAuthOrigin = (authOrigin, user) => {
  
  if (authOrigin === USER_AUTH_ORIGIN_ADMIN && user.role === USER_ROLE_ADMIN) {
    return true;
  }

  if (authOrigin === USER_AUTH_ORIGIN_PRODUCER && user.role === USER_ROLE_PRODUCER) {
    return true;
  }

  return false;
};

router.post(urls.user.entity.login, requireSchema(loginSchema), async (req, res) => {
  const {username, password, authOrigin} = req.validatedBody;
  const user = await UserService.authenticateWithPassword(username, password);

  if (user && !validateAuthOrigin(authOrigin, user)) {
    return res.status(403).json({
      errors: [
        {
          type: "general",
          value: "User role does not meet the criteria of the auth origin"
        }
      ]
    });
  }

  if (user) {
    const jwtSecret = process.env.JWT_TOKEN_KEY;
    const jwtPayload = {
      userId: user.id,
      userEmail: user.email,
      refreshId: user.refresh_id
    };

    const jwtOptions = {expiresIn: "1h"};

    const token = jsonwebtoken.sign(jwtPayload, jwtSecret, jwtOptions);

    return res.json({
      user: buildUserResponse(user),
      token: token
    });
  }

  return res
    .status(401)
    .json({errors: [{type: "general", value: "Authentication failed"}]});
});

export default router;
