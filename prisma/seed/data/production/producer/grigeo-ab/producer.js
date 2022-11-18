import find from 'lodash/find.js';

const producerData = {
  name: "Grigeo",
  url: "https://www.grigeo.lt/",
  data: {
    legal: {
      name: 'Grigeo AB',
      address: 'Vilniaus g. 10, Grigiškės, Vilnius City Municipality, Lithuania',
      code: "110012450"
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

export const seedGrigeoProducers = async ({prisma, terminal, grigeo: {users}}) => {

  /** Link Producer user to the "rappin" producer */
  const tomasUser = find(users, {email: 'tomas.jozonis@grigeo.lt'})
  const martynasUser = find(users, {email: 'martynas.nenenas@grigeo.lt'})

  const createUserLink = {
    create: [
      {user_id: tomasUser.id},
      {user_id: martynasUser.id}
    ]
  }

  const data = {
    ...producerData,
    ...producerData.name && {users: createUserLink}
  }

  const producer = await prisma.producer.create({data: data});

  terminal.green("Created producer - %s \n" , producer.name) ;

  return {id: producer.id, name: producer.name}
}
