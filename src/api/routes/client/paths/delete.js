import {Router} from "express";

import ClientService from "../../../../services/client.js";
import UserService from "../../../../services/user.js";
import {requireAdminRole} from "../../../middlewares/auth.js";
import {requireValidUuid} from "../../../middlewares/validate.js";
import urls from "../../../urls.js";
import buildDeleteResponse from "../responses/delete.js";

const router = Router();

router.delete(urls.client.delete, [requireAdminRole, requireValidUuid], async (req, res) => {
  try {
    /**
     * @TODO we should also validate if any of the purchases are in
     * the pending state and in that case prevent "deleting" the client
     */

    const clientId = req.params.id;

    /** Disable client */
    const client = await ClientService.delete(clientId);

    /** Set users inactive that are linked to the client */
    const clientUsers = await Promise.all(
      client.users.map(async ({user}) => {
        const updateData = {is_active: false};
        const updatedUser = await UserService.update(user.id, {updateData});
        return {id: updatedUser.id};
      })
    );

    res.status(200).send(buildDeleteResponse(client, clientUsers));
  } catch (err) {
    let responseErrMessage = err.message;

    if (err.code && err.code === "P2025") {
      responseErrMessage = "Client to delete not found";
    }

    res.status(400).json({
      error: "Failed to delete a client",
      message: responseErrMessage
    });
  }
});

export default router;
