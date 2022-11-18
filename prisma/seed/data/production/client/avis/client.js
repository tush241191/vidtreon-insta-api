import find from "lodash/find.js";

import {USER_ROLE_CLIENT} from "../../../../../../src/services/constants/user.js";

const inputClient = {
  name: "avis",
  type: "intermediary_cars",
  is_active: true,
  data: {
    url: "www.avis.com",
    country: "Estonia"
  }
}

export const seedAvisClient = async ({prisma, terminal, avisUsers}) => {
  /** Link Client user to the "avis" client */
  const clientUser = find(avisUsers, {role: USER_ROLE_CLIENT})

  const data = {
    ...inputClient,
    ...{users: {create: {user_id: clientUser.id}}}
  }

  const client = await prisma.client.create({data: data});

  terminal.green(`Created AVIS client || name - ${client.id} || Type - ${client.type}\n`);

  return {id: client.id, name: client.name}
}
