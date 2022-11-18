import jsonwebtoken from "jsonwebtoken";

import {USER_ROLE_ADMIN, USER_ROLE_CLIENT, USER_ROLE_PRODUCER} from "../../services/constants/user.js";
import UserService from "../../services/user.js";

export const requireJwt = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return returnNotAuthenticated(res, "A token is required for authentication")
  }

  try {
    const token = authHeader.substring(7, authHeader.length);

    const jwt = jsonwebtoken.verify(token, process.env.JWT_TOKEN_KEY);

    req.user = await UserService.get(jwt.userId);

    // TODO handle different scenarios for invalid access token (invalid, expired, etc)
    if (jwt.refreshId !== req.user.refresh_id) {
      throw new Error("Refresh ID is invalid or expired");
    }
  } catch (err) {
    return returnNotAuthenticated(res, "Invalid token")
  }

  return next();
};

export const requireAdminRole = async (req, res, next) => {
  try {
    if (req.user.role !== USER_ROLE_ADMIN) {
      throw new Error("User lacks permissions to perform the operation");
    }
  } catch (err) {
    return returnNotAuthorized(res, err.message)
  }

  return next();
};

export const requireClientRole = async (req, res, next) => {
  try {
    if (req.user.role !== USER_ROLE_CLIENT) {
      throw new Error("User must be of type client to perform the operation");
    }
  } catch (err) {
    return returnNotAuthorized(res, err.message)
  }

  return next();
};

export const requireProducerRole = async (req, res, next) => {
  try {
    if (req.user.role !== USER_ROLE_PRODUCER) {
      throw new Error("User must be of type producer to perform the operation");
    }
  } catch (err) {
    return returnNotAuthorized(res, err.message)
  }

  return next();
};

export const authorizeClientRequest = async (req, res, next) => {
  const clientId = req.clientId ?? req.body?.clientId
  if (!clientId) {
    return returnBadRequest(res, "Client id missing from request")
  }
  const userClientId = req.user.linkClient.client_id;
  if (clientId !== userClientId) {
    return returnNotAuthorized(res, "Not authorized to access this resource")
  }

  return next();
}

export const authorizeProducerRequest = async (req, res, next) => {
  const producerId = req.producerId ?? req.params.id ?? req.params.producerId ?? req.body?.producerId
  if (!producerId) {
    return returnBadRequest(res, "Producer id missing from request")
  }
  const userProducerId = req.user.linkProducer.producer_id;
  if (producerId !== userProducerId) {
    return returnNotAuthorized(res, "Not authorized to access this resource")
  }

  return next();
}

const returnBadRequest = (res, message) => {
  return res.status(400).send({error: message});
}

const returnNotAuthenticated = (res, message) => {
  return res.status(401).send({error: message});
}

const returnNotAuthorized = (res, message) => {
  return res.status(403).send({error: message});
}
