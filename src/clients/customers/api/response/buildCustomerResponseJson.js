const buildCustomerResponseJson = customer => {
  return {
    id: customer.id,
    name: customer.name,
    type: customer.type,
    vehicles: customer.vehicles,
    createdAt: customer.created_at
  };
};

export default buildCustomerResponseJson;
