export const normalizeStandardLicensePlate = licensePlate => {
  if (isStandardLicensePlate(licensePlate)) {
    return `${licensePlate.substring(0, 3)} ${licensePlate.substring(3, 6)}`
  } else {
    return null
  }
}

const isStandardLicensePlate = licensePlate => /^[0-9]{3}[A-Z]{3}/.test(licensePlate)
