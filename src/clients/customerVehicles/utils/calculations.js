export const getAverageCarbonEmissions = vehicle => vehicle.coWltp || vehicle.coNedc

export const calculateMonthlyFeeForCar = (allowedMonthlyMileage, coEmissions) => {
  const months = 12;
  const tonnePrice = 120; // @TODO this should be dynamic and dependant on the facility
  const oneTonne = 1000 * 1000 // Calculation is based on grams.
  const allowedYearlyMileage = months * allowedMonthlyMileage;
  return (allowedYearlyMileage * coEmissions / oneTonne * tonnePrice / months).toFixed(2);
};
