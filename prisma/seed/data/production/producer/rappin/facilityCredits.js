import ProducerFacilityCreditService from "../../../../../../src/services/producerFacilityCredit.js";
import ProducerFacilityInputService from "../../../../../../src/services/producerFacilityInput.js";

const sharedMetaData = {
  collector: 'STORA ENSO PACKAGING AS', // @TOOD rename to collector
  address: 'Eesti, Piirimäe 10, Tänassilma tehnopark, Saku vald',
  shipper: 'RAXELI OÜ',
  documentType: 'Invoice',
  materialDescription: 'pressed cardboard',
  wasteCode: '150101',
  materialType: '1.04.00'
}

const facilityInputMaterialBatches = [
  {
    tonnes: 13.26,
    date: new Date('2022-01-18'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000591'
      }
    }
  },
  {
    tonnes: 15.54,
    date: new Date('2022-02-03'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000643'
      }
    }
  },
  {
    tonnes: 12.92,
    date: new Date('2022-02-10'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000666',
        transportationVehicle: '017BSD'
      }
    }
  },
  {
    tonnes: 15.96,
    date: new Date('2022-03-01'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000721'
      }
    }
  },
  {
    tonnes: 10.32,
    date: new Date('2022-03-15'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000775'
      }
    }
  },
  {
    tonnes: 10.36,
    date: new Date('2022-03-24'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000819'
      }
    }
  },
  {
    tonnes: 12.72,
    date: new Date('2022-04-13'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000863'
      }
    }
  },
  {
    tonnes: 15.08,
    date: new Date('2022-04-21'),
    meta: {
      ...sharedMetaData,
      ...{
        shipper: 'VÄRSKA ORIGINAAL AS',
        documentNumber: '2240000907',
        transportationVehicle: '346MRN/335YKN',
        materialType: '1.05.00'
      }
    }
  },
  {
    tonnes: 12.36,
    date: new Date('2022-05-13'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240000966',
        materialType: '1.05.00'
      }
    }
  },
  {
    tonnes: 16.88,
    date: new Date('2022-05-24'),
    meta: {
      ...sharedMetaData,
      ...{
        shipper: 'VÄRSKA ORIGINAAL AS',
        documentNumber: '2240001022',
        materialType: '1.05.00'
      }
    }
  },
  {
    tonnes: 15.142,
    date: new Date('2022-06-09'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001071',
        transportationVehicle: '017BSD/268YLC'
      }
    }
  },
  {
    tonnes: 15.5,
    date: new Date('2022-07-05'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001122'
      }
    }
  },
  {
    tonnes: 15.98,
    date: new Date('2022-07-14'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001158'
      }
    }
  },
  {
    tonnes: 9.12,
    date: new Date('2022-07-21'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001182'
      }
    }
  },
  {
    tonnes: 7.197,
    date: new Date('2022-08-09'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001237'
      }
    }
  },
  {
    tonnes: 10.44,
    date: new Date('2022-08-23'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001279'
      }
    }
  },
  {
    tonnes: 14.32,
    date: new Date('2022-08-31'),
    meta: {
      ...sharedMetaData,
      ...{
        documentNumber: '2240001342'
      }
    }
  }
];

export const seedRappinFacilityCredits = async ({terminal, rappin: {facility}}) => {
  return await Promise.all(
    facilityInputMaterialBatches.map(async batch => {
      const facilityInput = await ProducerFacilityInputService.create({facility, batch});
      const facilityCredit = await ProducerFacilityCreditService.create({facility, facilityInput});

      terminal.green("Created facility credit - %s \n" , facility.name) ;

      return facilityCredit;
    })
  );
}
