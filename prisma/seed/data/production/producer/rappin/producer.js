import find from 'lodash/find.js';

const producerData = {
  name: "Rappin",
  url: "https://www.rappin.ee/",
  data: {
    legal: {
      name: 'Räpina Paberivabrik AS',
      address: 'Pargi tn 23 Räpina, Räpina vald Põlvamaa',
      code: "10149813"
    },
    informative: {
      tagline: '',
      description: '',
      field: '',
      goal: ''
    }
  },
  is_active: true
};

export const seedRappinProducer = async ({prisma, terminal, rappin: {users}}) => {

  /** Link Producer user to the "rappin" producer */
  const producerUser = find(users, {email: 'kaur@rappin.ee'})

  const createUserLink = {
    create: {
      user_id: producerUser.id
    }
  }

  const data = {
    ...producerData,
    ...producerData.name && {users: createUserLink}
  }

  const producer = await prisma.producer.create({data: data});

  terminal.green("Created producer - %s \n" , producer.name) ;

  return {id: producer.id, name: producer.name}
}
