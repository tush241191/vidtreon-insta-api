const buildContribution = purchase => {
  return {
    id: purchase.id,
    tonnes: purchase.tonnes,
    totalPrice: purchase.tonnes * purchase.tonne_price,
    date: purchase.date,
    facility: {
      id: purchase.facility_id,
      name: purchase.facility.name
    }
  };
};

export default buildContribution;
