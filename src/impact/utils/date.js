export const getMonthDifference = (startDate, endDate) =>
  endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
