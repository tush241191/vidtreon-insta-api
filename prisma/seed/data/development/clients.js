import find from "lodash/find.js";

import {USER_ROLE_CLIENT} from "../../../../src/services/constants/user.js";

const inputClients = [
  {
    name: "avis",
    type: "intermediary_cars",
    is_active: true,
    data: {
      url: "www.avis.com"
    }
  },
  {
    name: "swedbank",
    type: "regular",
    is_active: true,
    data: {
      url: "www.swedbank.ee"
    }
  },
  {
    name: "wolt",
    type: "regular",
    is_active: true,
    data: {
      url: "www.wolt.com"
    }
  },
  {
    name: "bolt",
    type: "regular",
    is_active: false,
    data: {
      url: "www.bolt.eu"
    }
  }
];

export const seedClients = async ({prisma, terminal, users}) => {
  return await Promise.all(
    inputClients.map(async clientData => {

      /** Link Client user to the "avis" client */
      const clientUser = find(users, {role: USER_ROLE_CLIENT})

      const createUserLink = {
        create: {
          user_id: clientUser.id
        }
      }

      const data = {
        ...clientData,
        ...clientData.name === 'avis' && {users: createUserLink}
      }

      const client = await prisma.client.create({data: data});

      terminal.green(`Created client || name - ${client.id} || Type - ${client.type}\n`);

      return {id: client.id, name: client.name}
    })
  );
}
