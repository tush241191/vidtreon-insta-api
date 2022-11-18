import ProducerFacilityService from "../../../../../../src/services/producerFacility.js";

const facilityData = {
  producerName: "Rappin",
  name: "Rappin Recycled Packaging",
  benchmark: 601,
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
      descriptionBlockOne: '',
      descriptionBlockTwo: '',
      descriptionBlockThree: '',
      benefits: [],
      verification: {
        qualityCriterias: []
      }
    }
  }
};

export const seedRappinFacility = async ({terminal, rappin: {producer}}) => {
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

  const facility = await ProducerFacilityService.create(data);

  terminal.green("Created facility - %s \n" , facility.name) ;

  return facility;
}
