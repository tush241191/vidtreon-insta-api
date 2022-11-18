const buildContributionsResponse = purchases => {
  return purchases.map(purchase => {
    const {first_name, last_name} = purchase.user;
    const userFullName = `${first_name} ${last_name}`;

    return {
      id: purchase.id,
      tonnes: purchase.tonnes,
      totalPrice: purchase.tonnes * purchase.tonne_price,
      date: purchase.date,
      facility: {
        id: purchase.facility_id,
        name: purchase.facility.name
      },
      user: {
        id: purchase.user.id,
        name: userFullName
      }
    };
  });
};

export default buildContributionsResponse;
