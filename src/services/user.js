import {log} from "console";
import {randomBytes} from "crypto";

import DatabaseError from "../models/error.js";
import {User} from "../models/init.js";
import {generatePasswordHash, validatePassword} from "../utils/password.js";
import BaseService from "./BaseService.js";
import {USER_ROLE_CLIENT, USER_ROLE_PRODUCER} from "./constants/user.js";

const generateRandomToken = () => {
  return randomBytes(48).toString("base64").replace(/[+/]/g, ".");
}

const linkProducerIncludeData = {include: {producer: {include: {logs: true}}}};
const linkClientIncludeData = {include: {client: true}};

const includeRoleBasedData = userRole => {
  if (userRole === USER_ROLE_PRODUCER) {
    return {linkProducer: linkProducerIncludeData};
  }

  return null;
}

class UserService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: User
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      const user = await User.findUnique({
        where: {id}
      });

      if (!user) return null;

      delete user.password;
      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async getByAgent(agent) {
    try {
      const user = await User.findUnique({
        where: {agent: agent}
      });

      if (!user) return null;

      delete user.password;
      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, {updateData, password}) {
    let data = updateData;
    if (password) {
      data.password = await generatePasswordHash(password);
    }

    try {
      return User.update({
        where: {id},
        data: {
          ...data,
          ...{updated_at: new Date()}
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      return await super.delete({
        service: User,
        id: id
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async authenticateWithPassword(username, password) {
    try {
      const user = await User.findUnique({
        where: {email: username}
      });

      if (!user) return null;

      const isPasswordValid = await validatePassword(password, user.password);
      const isUserActive = user.is_active && user.deleted_at === null

      if (!isPasswordValid || !isUserActive) return null;

      user.last_login_at = new Date();

      const updatedUser = await User.update({
        where: {id: user.id},
        data: {last_login_at: user.last_login_at}
      });

      delete updatedUser.password;
      return updatedUser;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async createUser({userData, password}) {
    const userPasswordHash = await generatePasswordHash(password);

    try {
      const data = {
        ...userData,
        ...{
          password: userPasswordHash,
          refresh_id: generateRandomToken()
        }
      };

      const user = await User.create({
        data: data
      });

      delete user.password;
      delete user.refresh_id;
      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async setPassword(user, password) {
    user.password = await generatePasswordHash(password); // eslint-disable-line

    try {
      if (user.id) {
        return User.update({
          where: {id: user.id},
          data: {password: user.password}
        });
      }

      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async regenerateRefreshId(user) {
    const newRefreshId = generateRandomToken(); // eslint-disable-line

    try {
      if (user.id) {
        return User.update({
          where: {id: user.id},
          data: {refresh_id: newRefreshId, updated_at: new Date()}
        });
      }

      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async regenerateToken(user) {
    user.token = generateRandomToken(); // eslint-disable-line

    try {
      if (user.id) {
        return User.update({
          where: {id: user.id},
          data: {password: user.password}
        });
      }

      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default UserService;
