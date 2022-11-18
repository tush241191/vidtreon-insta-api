import PurchaseService from "../../../../../../src/services/purchase.js";

const purchaseDateAugust = new Date('2022-08-05');
const purchaseDateSeptember = new Date('2022-09-05');
const purchaseDateOctober = new Date('2022-10-05');
const purchaseDates = [
  purchaseDateAugust,
  purchaseDateSeptember,
  purchaseDateOctober
]

// Total tonnes per month - 2.441332
const purchases = [
  {licensePlate: '708DTN', clientCustomer: 'AVIS', tonnes: 0.122},
  {licensePlate: '537CBR', clientCustomer: 'AVIS', tonnes: 0.1725},
  {licensePlate: '414LHR', clientCustomer: 'AVIS', tonnes: 0.150},
  {licensePlate: '958VHJ', clientCustomer: 'AVIS', tonnes: 0.758333},
  {licensePlate: '222BFN', clientCustomer: 'AVIS', tonnes: 0.770833},
  {licensePlate: '222MJN', clientCustomer: 'AVIS', tonnes: 0.336666},
  {licensePlate: '731MWD', clientCustomer: 'AVIS', tonnes: 0.131}
];

/** All the Avis purchases are tied to Rappin facility */
export const seedAvisPurchases = async ({terminal, rappin: {facility}, avisClient}) => {
  let response = [];
  for (const purchase of purchases) {
    for (const date of purchaseDates) {
      const purchaseData = {
        tonnes: purchase.tonnes,
        purchaseDate: date,
        meta: {clientCustomerVehicle: {
          licensePlate: purchase.licensePlate,
          clientCustomer: purchase.clientCustomer
        }},
        client: avisClient,
        facility: facility
      }

      const carPurchase = await PurchaseService.createVehiclePurchase(purchaseData);

      await PurchaseService.setPurchasePaid(carPurchase.id);

      terminal.green(`Created purchase || ID - ${carPurchase.id} || Date - ${carPurchase.date} \n`);

      await new Promise(resolve => setTimeout(resolve, 500));

      response.push(carPurchase)
    }
  }

  return response;
}
