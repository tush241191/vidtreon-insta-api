export const buildListResponse = producerList => {
  return producerList.map(producer => {
    return {
      id: producer.id,
      name: producer.name,
      url: producer.url,
      isActive: producer.is_active
    };
  });
};

export const buildFacilityMinResponse = facility => {
  return {
    id: facility.id,
    name: facility.name
  };
};
