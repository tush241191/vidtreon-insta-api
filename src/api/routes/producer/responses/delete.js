const buildDeleteResponse = producer => {
  return {
    producer: {
      id: producer.id
    },
    facilities: producer.facilities.map(facility => {
      return {
        id: facility.id,
        name: facility.name
      }
    })
  };
};

export default buildDeleteResponse;
