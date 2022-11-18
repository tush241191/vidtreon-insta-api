const buildUpdateResponse = producer => {
  return {
    id: producer.id,
    name: producer.name,
    url: producer.url,
    constant: producer.constant,
    data: {
      legal: {
        name: producer.data.legal.name,
        address: producer.data.legal.address,
        code: producer.data.legal.code
      },
      informative: {
        tagline: producer.data.informative.tagline,
        description: producer.data.informative.description,
        field: producer.data.informative.field,
        goal: producer.data.informative.goal
      }
    },
    isActive: producer.is_active
  };
};

export default buildUpdateResponse;
