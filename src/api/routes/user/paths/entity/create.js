import {Router} from "express";

import {USER_ROLE_ADMIN} from "../../../../../services/constants/user.js";
import UserService from "../../../../../services/user.js";
import {requireSchema} from "../../../../middlewares/validate.js";
import {createSchema} from "../../../../schemas/user/create.js";
import urls from "../../../../urls.js";
import buildCreateResponse from "../../responses/entity/create.js";

const router = Router();

const buildUserData = data => {
  const userData = {
    email: data.email,
    role: data.role,
    is_active: true,
    first_name: data.firstName,
    last_name: data.lastName,
    insta_token: data.insta_token,
    data: {
      country: data.country.toLowerCase(),
      position: data.position
    }
  };

  return userData;
};

router.post(urls.user.entity.create, requireSchema(createSchema), async (req, res) => {
  const reqData = req.validatedBody;

  try {

    const userData = buildUserData(reqData);
    const user = await UserService.createUser({
      userData,
      password: reqData.password
    });

    res.json({
      user: buildCreateResponse(user)
    });
  } catch (err) {
    let responseError = {
      error: "Failed to create a user",
      message: err.message
    };

    if (err.code && err.code === "P2002") {
      responseError = {error: `${err.details.target} field has to be unique`};
    }

    res.status(400).json(responseError);
  }
});

export default router;
