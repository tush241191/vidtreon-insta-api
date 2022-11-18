const buildSingleFacilityResponse = facility => {
  return {
    id: facility.id,
    name: facility.name,
    country: facility.country,
    meta: facility.meta,
    data: facility.data,
    type: facility.type,
    price: facility.price,
    producer: {
      id: facility.producer.id,
      name: facility.producer.name,
      url: facility.producer.url,
      data: facility.producer.data
    }
  };
};

export default buildSingleFacilityResponse;
