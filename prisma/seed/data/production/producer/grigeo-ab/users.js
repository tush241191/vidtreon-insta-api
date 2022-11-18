import {randomBytes} from "crypto";

import {USER_ROLE_PRODUCER} from "../../../../../../src/services/constants/user.js";
import {generatePasswordHash} from "../../../../../../src/utils/password.js";

const generateRandomToken = () => {
  return randomBytes(48).toString("base64").replace(/[+/]/g, ".");
}

const inputUsers = [
  {
    email: "tomas.jozonis@grigeo.lt",
    password: "NIjuCPKyPt1VfT0NDkkq5aZdHkUsA6TDvDD5uao3",
    refresh_id: generateRandomToken(),
    first_name: "Tomas",
    last_name: "Jozonis",
    data: {
      country: "lithuania",
      position: "General Manager"
    },
    role: USER_ROLE_PRODUCER,
    is_active: true
  },
  {
    email: "martynas.nenenas@grigeo.lt",
    password: "WlGXTZxBTYL87pA3fas3gQxaOtqFCE2pi4oY8Jlp",
    refresh_id: generateRandomToken(),
    first_name: "Martynas",
    last_name: "Nenėnas",
    data: {
      country: "lithuania",
      position: "Finance Director"
    },
    role: USER_ROLE_PRODUCER,
    is_active: true
  }
];

export const seedGrigeoUsers = async ({prisma, terminal}) => {
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
