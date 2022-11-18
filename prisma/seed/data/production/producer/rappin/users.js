import {randomBytes} from "crypto";

import {USER_ROLE_PRODUCER} from "../../../../../../src/services/constants/user.js";
import {generatePasswordHash} from "../../../../../../src/utils/password.js";

const generateRandomToken = () => {
  return randomBytes(48).toString("base64").replace(/[+/]/g, ".");
}

const inputUsers = [
  {
    email: "kaur@rappin.ee",
    password: "r8509qC0brk23MJm0zu6QRnCp6RqmqqQ0DxRoo8M",
    refresh_id: generateRandomToken(),
    first_name: "Kaur",
    last_name: "Palm",
    data: {
      country: "estonia",
      position: "CEO"
    },
    role: USER_ROLE_PRODUCER,
    is_active: true
  }
];

export const seedRappinUsers = async ({prisma, terminal}) => {
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
