import {Router} from "express";

import UserService from "../../../../../services/user.js";
import {requireSchema, requireValidUuid} from "../../../../middlewares/validate.js";
import {updateSchema} from "../../../../schemas/user/update.js";
import urls from "../../../../urls.js";
import buildUpdateResponse from "../../responses/entity/update.js";

const router = Router();

const buildUserData = ({data, user}) => {
  const booleanKeyPresent = key => key !== undefined

  const dataField = {
    ...user.data,
    ...data.country && {country: data.country.toLowerCase()},
    ...data.position && {position: data.position}
  }

  return {
    ...data.email && {email: data.email},
    ...data.firstName && {first_name: data.firstName},
    ...data.lastName && {last_name: data.lastName},
    ...booleanKeyPresent(data.isActive) && {is_active: data.isActive},
    ...{data: dataField}
  };
};

router.patch(urls.user.entity.update, requireSchema(updateSchema), requireValidUuid, async (req, res) => {
  const reqData = req.validatedBody;

  try {
    const userId = req.params.id;
    const user = await UserService.get(userId);
    const updateData = buildUserData({data: reqData, user: user});
    const updatedUser = await UserService.update(userId, {updateData, password: reqData.password});

    res.json({
      user: buildUpdateResponse(updatedUser)
    });
  } catch (err) {
    let responseError = {
      error: "Failed to update a user",
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
