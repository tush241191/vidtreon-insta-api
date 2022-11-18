const inputFacilities = [
  {
    producerName: "Grigeo",
    name: "Grigeo",
    benchmark: 601,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 20,
    additionality_percentage: 10,
    meta: {
      country: "lithuania",
      design_definitions: {
        bannerBgType: "paper",
        bannerTextType: "dark"
      },
      highlight_features: {
        descriptionBlockOne: '',
        descriptionBlockTwo: '',
        descriptionBlockThree: '',
        benefits: [],
        verification: {
          qualityCriterias: []
        }
      }
    }
  },
  {
    producerName: "Grigeo Klaipeda",
    name: "Grigeo Klaipeda",
    benchmark: 601,
    type: "carbon_reduction",
    price: 120,
    buffer_percentage: 20,
    additionality_percentage: 10,
    meta: {
      country: "lithuania",
      design_definitions: {
        bannerBgType: "paper",
        bannerTextType: "dark"
      },
      highlight_features: {
        descriptionBlockOne: '',
        descriptionBlockTwo: '',
        descriptionBlockThree: '',
        benefits: [],
        verification: {
          qualityCriterias: []
        }
      }
    }
  }
];

export const seedGrigeoFacilities = async ({prisma, terminal, grigeo: {producer}}) => {
  return await Promise.all(
    inputFacilities.map(async facilityData => {
      const data = {
        ...{
          name: facilityData.name,
          benchmark: facilityData.benchmark,
          type: facilityData.type,
          price: facilityData.price,
          buffer_percentage: facilityData.buffer_percentage,
          additionality_percentage: facilityData.additionality_percentage,
          producer_id: producer.id
        },
        ...{meta: {create: facilityData.meta}}
      }

      const facility = await prisma.producerFacility.create({data: data});

      terminal.green("Created facility - %s \n" , facility.name) ;

      return facility;
    })
  );
}
