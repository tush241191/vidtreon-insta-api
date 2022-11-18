import {createHash} from "crypto";

const algorithm = 'sha256';
const inputEncoding = 'utf-8';

/**
 * @TODO this will be dynamic in the future
 */
const reductionMethodology = 'paper and board reduction';

/**
 * This is the base function used to generate validation hashes.
 *
 * @param {object} obj
 * @returns {string}
 */
const objectToValidationHash = obj => {
  const data = JSON.stringify(obj);

  return createHash(algorithm)
    .update(data, inputEncoding)
    .digest('hex')
};

/**
 * @TODO
 * We should implement a catch block here for the helpers in case
 * the given object does not have all the data for hashing
 */

export const generateFacilityInputHash = ({inputTonnes, facility, createdAt}) => {
  const validationHashData = {
    facilityIdentifier: facility.id,
    originCountry: facility.meta.country,
    inputTonnes: inputTonnes,
    reductionMethodology: reductionMethodology,
    creationDate: createdAt,
    secondaryMaterial: {
      wasteCode: facility.meta.waste_code,
      materialType: facility.meta.material_type
    }
  }

  return objectToValidationHash(validationHashData)
}

export const generateFacilityCreditHash = ({creditTonnes, facility, createdAt}) => {
  const validationHashData = {
    facilityIdentifier: facility.id,
    originCountry: facility.meta.country,
    creditTonnes: creditTonnes,
    reductionMethodology: reductionMethodology,
    creationDate: createdAt,
    secondaryMaterial: {
      wasteCode: facility.meta.waste_code,
      materialType: facility.meta.material_type
    }
  }

  return objectToValidationHash(validationHashData)
}

export const generatePurchaseHash = ({tonnes, purchaseId, dateOfPurchase, facility}) => {
  const validationHashData = {
    tonnes: tonnes,
    uniqueSerialNumber: purchaseId,
    issuanceDate: dateOfPurchase,
    issuanceCountry: facility.meta.country,
    reductionMethodology: reductionMethodology,
    facility: {
      facilityId: facility.id,
      producerId: facility.producer_id
    },
    secondaryMaterial: {
      wasteCode: facility.meta.waste_code,
      materialType: facility.meta.material_type
    }
  }

  return objectToValidationHash(validationHashData)
}
