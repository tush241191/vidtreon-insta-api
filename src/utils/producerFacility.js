/**
 * Used to calculate the additionality tonnes.
 *
 * Calculation takes in the input material tonnes and calculates the additionality
 * based on the percentage defined for the producer facility as additionality_percentage
 *
 * @param {number} inputTonnes
 * @param {number} additionalityPercentage
 * @returns {number}
 */
export const calculateAdditionalityTonnes = ({inputTonnes, additionalityPercentage}) => {
  return inputTonnes * additionalityPercentage / 100;
}

/**
 * Used to calculate credit tonnes generated from the input material additionality
 *
 * - Total Tonnes is calculated from the additionality amount multiplied by benchmark.
 *   Benchmark is defined as integer, hence we need to divide it by 1000.
 * - Buffer Tonnes is calculated from the calculated total credits where the percentage
 *   comes from the Producer Facility.
 * - Available Tonnes is the amount of credits available for purchase. It's calculated
 *   from the total tonnes amount, subtracted from it is the buffer amount.
 *
 * @param {number} additionalityTonnes
 * @param {number} bufferPercentage
 * @param {number} benchmark
 * @returns {{totalTonnes: number, bufferTonnes: number, availableTonnes: number}}
 */
export const calculateCreditTonnes = ({additionalityTonnes, bufferPercentage, benchmark}) => {
  const totalTonnes = additionalityTonnes * benchmark / 1000;
  const bufferTonnes = totalTonnes * bufferPercentage / 100;
  const availableTonnes = totalTonnes - bufferTonnes;

  return {
    totalTonnes,
    bufferTonnes,
    availableTonnes
  }
}
