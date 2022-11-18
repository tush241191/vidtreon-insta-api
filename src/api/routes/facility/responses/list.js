export const buildFacilityResponse = facility => {
  const url = facility.name.replace(/\s+/g, "-").toLowerCase();

  return {
    id: facility.id,
    name: facility.name,
    url: url,
    country: facility.country,
    meta: facility.meta,
    type: facility.type,
    price: facility.price,
    producer: {
      name: facility.producer.name,
      url: facility.producer.url,
      data: facility.producer.data
    }
  };
};
