import {randomBytes} from "crypto";

import {USER_ROLE_CLIENT} from "../../../../../../src/services/constants/user.js";
import {generatePasswordHash} from "../../../../../../src/utils/password.js";

const generateRandomToken = () => {
  return randomBytes(48).toString("base64").replace(/[+/]/g, ".");
}

const inputUsers = [
  {
    email: "user@avis.ee",
    password: "qvKYbo4mQ9ZRh7EcsnsJfcfUmLc6lZN0b3LbYrW0",
    refresh_id: generateRandomToken(),
    first_name: "Avis",
    last_name: "Avis",
    data: {
      country: "estonia",
      position: "CEO"
    },
    role: USER_ROLE_CLIENT,
    is_active: true
  }
];

export const seedAvisUsers = async ({prisma, terminal}) => {
  return await Promise.all(
    inputUsers.map(async userData => {
      const userPassword = await generatePasswordHash(userData.password);

      const data = {
        ...userData,
        ...{password: userPassword}
      };

      const user = await prisma.user.create({data: data});

      terminal.green(`Created AVIS user || ID - ${user.id} || Email - ${user.email}\n`);

      return {id: user.id, email: user.email, role: user.role}
    })
  );
}
