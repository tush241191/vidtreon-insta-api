const buildReadResponse = producer => {
  const {legal, informative} = producer.data;
  return {
    id: producer.id,
    name: producer.name,
    url: producer.url,
    constant: producer.constant,
    data: {
      legal: {
        name: legal.name,
        address: legal.address,
        code: legal.code
      },
      informative: {
        tagline: informative.tagline,
        description: informative.description,
        field: informative.field,
        goal: informative.goal
      }
    },
    isVerified: producer.is_verified,
    isActive: producer.is_active,
    facilities: producer.facilities.map(facility => {
      return {
        id: facility.id,
        name: facility.name
      };
    })
  };
};

export default buildReadResponse;
