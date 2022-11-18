const buildCertResponse = purchase => {
  return {
    id: purchase.id,
    purchase: {
      purpose: purchase.purpose,
      tonnes: purchase.tonnes,
      date: purchase.date,
      client: {
        name: purchase.user.linkClient.client.name
      }
    },
    retireDate: purchase.date,
    facility: {
      name: purchase.facility.name,
      producer: {
        name: purchase.producer.name
      }
    }
  };
};

export default buildCertResponse;
