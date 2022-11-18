import find from "lodash/find.js";

const inputFacilities = [
  {
    producerName: "rappin",
    name: "Rappin Recycled Packaging",
    benchmark: 607,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 20,
    additionality_percentage: 10,
    meta: {
      country: "estonia",
      design_definitions: {
        bannerBgType: "paper",
        bannerTextType: "dark"
      },
      highlight_features: {
        descriptionBlockOne:
          "Rappin collect waste paper and produces high quality pulp by removing residue materials like plastic tapes, ink and metal.",
        descriptionBlockTwo:
          "Starch, glue, chalk and paint are added and pulp is treated to create paper mass and then paper or cardboard",
        descriptionBlockThree:
          "Carboard is treated with glue, laminated and transformed to produce edge protectors and other similar products",
        benefits: [
          {
            title: "Reducing waste",
            description:
              "Reusing recycled materials in production helps <strong>reduce discarded paper</strong> that according to IPCC is emitted back to the atmosphere in 2 years. With Rappin products that <strong>CO2 embodied in the waste paper is locked-up to a storage for the next lifecycle.</strong>"
          },
          {
            title: "Avoiding emissions",
            description:
              "Use of Rappin products can displace use of other packaging materials like A or B. <strong>At best nearly X tons of CO2 emissions may be transformed to 1 ton of CO2 removal.</strong>"
          },
          {
            title: "Acceleration impact",
            description:
              "Selling carbon credits allows Rappin:<ul><li>to develop it’s concept of using local waste paper and board materials further, converting it to other carbon negative products;</li><li>to increase the production capacity and</li><li>to pay premiums and add incentives to the parties collecting local waste paper and board materials from the consumers.</li></ul>"
          },
          {
            title: "Carbon removal",
            description:
              "1 ton of Rappin packaging products removes X tons of CO2 equivalent from the atmosphere into at least one lifecycle long storage in the product and saves X full grown trees from being harvested and used for production of raw material otherwise."
          },
          {
            title: "Green jobs",
            description:
              "Manufacturing green packaging materials creates green jobs."
          },
          {
            title: "Conserving energy",
            description:
              "Using recycled materials instead of raw materials conserves 70.3% of the electrical energy"
          }
        ],
        verification: {
          qualityCriterias: [
            {
              title: "Additionality",
              description:
                "<ul><li>KWOTA ensures that with a thorough review of the scientific literature and various analyzes, and chooses a so-called conservative approach to follow.</li> <li>KWOTA makes regular checks and control calculations regarding producers that recycle secondary materials and turn them into products and therefore claim credits.</li> <li>Scientific, conservative approach, regular updates - loome standardi ja võrdlusalsed, mis on ajas muutuvad</li><li>Kasutame nii teaduspõhiseid kui statistilisi andmeid kui ka konkreetseid ja reaalsetele tõendatud andmetele tuginevaid tootjapõhiseid analüüse</li></ul>"
            },
            {
              title: "Permanence",
              description:
                "KWOTA credits are physically impossible to reverse and are therefore permanent. KWOTA avoids/saves CO2 by using secondary materials. Furthermore, by recycling the material several times it has a cascading effect of saving CO2."
            },
            {
              title: "Not claimed by another entity",
              description:
                "<ul><li>KWOTA keeps a record of all waste that has been properly collected and handed over. Kwota traces the waste streams, and it is monitored to avoid and eliminate possible double-counting.</li> <li>Contractual agreement between Kwota, recyclers, manufacturers: a contractual agreement between KWOTA, the recyclers and the manufacturer, guaranteeing that only one of them (Kwota) will claim the carbon credits. In addition, product buyers may not claim emission reduction in their footprint calculations (e.g. one buys carton products from Räpina and shows how good they are by using recycled products and counts the CO2 savings on their behalf) </li><li>Registry! KWOTA ensures that the credits used for offsetting one’s footprint are properly canceled/retired.</li></ul>"
            },
            {
              title:
                "Not associated with significant social or environmental harm",
              description:
                "<ul><li>KWOTA, to the contrary, significantly contributes to halting biodiversity loss through a circular economy.</li> <li>KWOTA also contributes to positive social impact (e.g. case study of Räpina – hiring local people) and makes the burden/footprint of pulp and paper industry smaller (less chemicals, energy consumption, and transportation etc.).</li><li>KWOTA - governance! Creating / bringing transparency to the waste management system</li></ul>"
            }
          ]
        }
      } 
    }
  },
  {
    producerName: "doloop",
    name: "doloop plastic packaging",
    benchmark: 601,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 40,
    additionality_percentage: 10,
    meta: {
      country: "lithuania",
      design_definitions: {
        bannerBgType: "default",
        bannerTextType: "light"
      },
      highlight_features: {
        descriptionBlockOne:
          "doloop is a leading Northern European PET packaging producer focused on global sustainability solutions",
        descriptionBlockTwo:
          "doloop serves beverage and food industry to provide them high quality and innovative packaging solutions",
        descriptionBlockThree:
          "doloop wants to offer 100% recyclable PET packaging solutions made from 100% recycled plastics",
        benefits: [
          {
            title: "Reducing waste",
            description: ""
          },
          {
            title: "Avoiding emissions",
            description: ""
          },
          {
            title: "Acceleration impact",
            description: ""
          },
          {
            title: "Carbon removal",
            description: ""
          },
          {
            title: "Green jobs",
            description: ""
          },
          {
            title: "Conserving energy",
            description: ""
          }
        ],
        verification: {
          qualityCriterias: [
            {
              title: "Additionality",
              description: ""
            },
            {
              title: "Permanence",
              description: ""
            },
            {
              title: "Double-counting",
              description: ""
            },
            {
              title: "Leakage",
              description: ""
            }
          ]
        }
      }
    }
  },
  {
    producerName: "gramitherm",
    name: "Gramitherm Grass Insulating",
    benchmark: 601,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 30,
    additionality_percentage: 10,
    meta: {
      country: "belgium",
      design_definitions: {
        bannerBgType: "default",
        bannerTextType: "light"
      },
      highlight_features: {
        descriptionBlockOne:
          "Gramitherm is today the only company in the world able to offer insulating solutions based on natural « silage » grass boards",
        descriptionBlockTwo:
          "Gramitherm produces insulating materials that are natural, healthy and with a positive impact on the environment.",
        descriptionBlockThree:
          "Gramitherm aims to build a global concept based on local agricultural partners and to give priority to short circuit distribution",
        benefits: [
          {
            title: "Reducing waste",
            description: ""
          },
          {
            title: "Avoiding emissions",
            description: ""
          },
          {
            title: "Acceleration impact",
            description: ""
          },
          {
            title: "Carbon removal",
            description: ""
          },
          {
            title: "Green jobs",
            description: ""
          },
          {
            title: "Conserving energy",
            description: ""
          }
        ],
        verification: {
          qualityCriterias: [
            {
              title: "Additionality",
              description: ""
            },
            {
              title: "Permanence",
              description: ""
            },
            {
              title: "Double-counting",
              description: ""
            },
            {
              title: "Leakage",
              description: ""
            }
          ]
        }
      }
    }
  },
  {
    producerName: "fibenol",
    name: "Sustainable Biomaterials",
    benchmark: 601,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 20,
    additionality_percentage: 10,
    meta: {
      country: "latvia",
      design_definitions: {
        bannerBgType: "default",
        bannerTextType: "light"
      },
      highlight_features: {
        descriptionBlockOne:
          "Fibenol is a company producing sustainable biomaterials in Latvia",
        descriptionBlockTwo:
          "Fibenol uses certified secondary use biomass to produce novel biomaterials like Lignova and wood sugars.",
        descriptionBlockThree:
          "Fibenol aims to convert more than 90% of woody biomass into high-value products with minimal environmental impact",
        benefits: [
          {
            title: "Reducing waste",
            description: ""
          },
          {
            title: "Avoiding emissions",
            description: ""
          },
          {
            title: "Acceleration impact",
            description: ""
          },
          {
            title: "Carbon removal",
            description: ""
          },
          {
            title: "Green jobs",
            description: ""
          },
          {
            title: "Conserving energy",
            description: ""
          }
        ],
        verification: {
          qualityCriterias: [
            {
              title: "Additionality",
              description: ""
            },
            {
              title: "Permanence",
              description: ""
            },
            {
              title: "Double-counting",
              description: ""
            },
            {
              title: "Leakage",
              description: ""
            }
          ]
        }
      }
    }
  },
  {
    producerName: "stora enso",
    name: "Paperboard materials",
    benchmark: 601,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 20,
    additionality_percentage: 10,
    meta: {
      country: "finland",
      design_definitions: {
        bannerBgType: "default",
        bannerTextType: "light"
      },
      highlight_features: {
        descriptionBlockOne:
          "Stora Enso is a leading provider of renewable products in packaging, biomaterials, wooden construction and paper",
        descriptionBlockTwo:
          "Stora Enso produces low carbon, renewable and recyclable paperboards and you can find the right packaging for any imaginable end-use.",
        descriptionBlockThree:
          "Store Enso wants to phase out fossil-based packaging",
        benefits: [
          {
            title: "Reducing waste",
            description: ""
          },
          {
            title: "Avoiding emissions",
            description: ""
          },
          {
            title: "Acceleration impact",
            description: ""
          },
          {
            title: "Carbon removal",
            description: ""
          },
          {
            title: "Green jobs",
            description: ""
          },
          {
            title: "Conserving energy",
            description: ""
          }
        ],
        verification: {
          qualityCriterias: [
            {
              title: "Additionality",
              description: ""
            },
            {
              title: "Permanence",
              description: ""
            },
            {
              title: "Double-counting",
              description: ""
            },
            {
              title: "Leakage",
              description: ""
            }
          ]
        }
      }
    }
  }
];

export const seedFacilities = async ({prisma, terminal, producers}) => {
  return await Promise.all(
    inputFacilities.map(async facilityData => {
      
      const facilityProducer = find(producers, {name: facilityData.producerName})

      const data = {
        ...{
          name: facilityData.name,
          benchmark: facilityData.benchmark,
          type: facilityData.type,
          price: facilityData.price,
          buffer_percentage: facilityData.buffer_percentage,
          producer_id: facilityProducer.id
        },
        ...{meta: {create: facilityData.meta}}
      }

      const facility = await prisma.producerFacility.create({data: data});

      terminal.green("Created facility - %s \n" , facility.name) ;

      return facility;
    })
  );
}
