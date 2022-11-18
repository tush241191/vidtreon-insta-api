import {randomBytes} from "crypto";

import {USER_ROLE_ADMIN, USER_ROLE_CLIENT, USER_ROLE_PRODUCER} from "../../../../src/services/constants/user.js";
import {generatePasswordHash} from "../../../../src/utils/password.js";

const generateRandomToken = () => {
  return randomBytes(48).toString("base64").replace(/[+/]/g, ".");
}

const inputUsers = [
  {
    email: "admin@kwota.com",
    password: "6Y8xz9XpwTX6ecQvge9IhgKlrCmdNzSQ7TMCJlk4",
    refresh_id: generateRandomToken(),
    first_name: "Admin",
    last_name: "Doe",
    data: {
      country: "estonia",
      position: "Test Admin"
    },
    role: USER_ROLE_ADMIN,
    is_active: true
  },
  {
    email: "client@kwota.com",
    password: "k3ZwdNbzKioIisjqG5iN57lUie2DnYs352XIP210",
    refresh_id: generateRandomToken(),
    first_name: "Client",
    last_name: "Doe",
    data: {
      country: "estonia",
      position: "Client Representative"
    },
    role: USER_ROLE_CLIENT,
    is_active: true
  },
  {
    email: "producer@kwota.com",
    password: "naWD7GentrI00O91WauM7nF1Cy7bvtjNuIjfR0ud",
    refresh_id: generateRandomToken(),
    first_name: "Producer",
    last_name: "Doe",
    data: {
      country: "estonia",
      position: "Producer Representative"
    },
    role: USER_ROLE_PRODUCER,
    is_active: true
  }
];

export const seedUsers = async ({prisma, terminal}) => {
  return await Promise.all(
    inputUsers.map(async userData => {
      const userPassword = await generatePasswordHash(userData.password);

      const data = {
        ...userData,
        ...{password: userPassword}
      };

      const user = await prisma.user.create({data: data});

      terminal.green(`Created user || ID - ${user.id} || Email - ${user.email}\n`);

      return {id: user.id, email: user.email, role: user.role}
    })
  );
}
