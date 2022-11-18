import find from 'lodash/find.js';

import {USER_ROLE_PRODUCER} from "../../../../src/services/constants/user.js";

const inputProducers = [
  {
    name: "rappin",
    url: "www.rappin.ee",
    data: {
      legal: {
        name: 'Rappin OÜ',
        address: 'Põlvamaa, Räpina vald, Räpina linn, Võhandu tn 16, 64504',
        code: "16124224"
      },
      informative: {
        tagline:
          "CO2 emissions savings by increasing recycled paper use in Estonia",
        description:
          "<strong>Rappin</strong> is Estonian paper mill located in Räpina, southern Estonia. You can read more from www.rappin.ee",
        field:
          "<strong>Rappin</strong> offers carbon negative packaging products. Through the idea of being climate neutral.",
        goal: "Rappin is aiming to produce all products from <span class='color-kwota-teal'>recycled materials</span> only."
      }
    },
    is_active: true
  },
  {
    name: "doloop",
    url: "www.doloop.com",
    data: {
      legal: {
        name: 'Doloop OÜ',
        address: 'Nevada 89437, United States',
        code: "11111111"
      },
      informative: {
        tagline: "Regenerative packaging solutions",
        description:
          "<strong>doloop</strong> is a leading Northern European PET packaging producer focused on global sustainability solutions",
        field:
          "<strong>doloop</strong> doloop serves beverage and food industry to provide them high quality and innovative packaging solutions",
        goal: "<strong>doloop</strong> wants to offer 100% recyclable PET packaging solutions made from 100% recycled plastics"
      }
    },
    is_active: true
  },
  {
    name: "gramitherm",
    url: "www.gramitherm.ch",
    data: {
      legal: {
        name: 'Gramitherm OÜ',
        address: 'Nevada 89437, United States',
        code: "11111111"
      },
      informative: {
        tagline: "Unique insulation batt made from GRASS",
        description:
          "<strong>Gramitherm</strong> is today the only company in the world able to offer insulating solutions based on natural « silage » grass boards",
        field:
          "<strong>Gramitherm</strong> produces insulating materials that are natural, healthy and with a positive impact on the environment.",
        goal: "<strong>Gramitherm</strong> aims to build a global concept based on local agricultural partners and to give priority to short circuit distribution"
      }
    },
    is_active: true
  },
  {
    name: "fibenol",
    url: "www.fibenol.com",
    data: {
      legal: {
        name: 'Fibenol OÜ',
        address: 'Nevada 89437, United States',
        code: "11111111"
      },
      informative: {
        tagline: "Novel bio-based raw materials – more qualities, less footprint",
        description:
          "<strong>Fibenol</strong> is a company producing sustainable biomaterials in Latvia",
        field:
          "<strong>Fibenol</strong> uses certified secondary use biomass to produce novel biomaterials like Lignova and wood sugars.",
        goal: "<strong>Fibenol</strong> aims to convert more than 90% of woody biomass into high-value products with minimal environmental impact"
      }
    },
    is_active: true
  },
  {
    name: "stora enso",
    url: "www.storaenso.com",
    data: {
      legal: {
        name: 'Stora Enso OÜ',
        address: 'Nevada 89437, United States',
        code: "11111111"
      },
      informative: {
        tagline: "Working for a greener world",
        description:
          "<strong>Stora Enso</strong> is a leading provider of renewable products in packaging, biomaterials, wooden construction and paper",
        field:
          "<strong>Stora Enso</strong> produces low carbon, renewable and recyclable paperboards and you can find the right packaging for any imaginable end-use.",
        goal: "<strong>Stora Enso</strong> wants to phase out fossil-based packaging"
      }
    },
    is_active: true
  }
];

export const seedProducers = async ({prisma, terminal, users}) => {
  return await Promise.all(
    inputProducers.map(async producerData => {

      /** Link Producer user to the "rappin" producer */
      const producerUser = find(users, {role: USER_ROLE_PRODUCER})

      const createUserLink = {
        create: {
          user_id: producerUser.id
        }
      }

      const data = {
        ...producerData,
        ...producerData.name === 'rappin' && {users: createUserLink}
      }

      const producer = await prisma.producer.create({data: data});

      terminal.green("Created producer - %s \n" , producer.name) ;

      return {id: producer.id, name: producer.name}
    })
  );
}
