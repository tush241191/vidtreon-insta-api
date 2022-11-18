const buildCreateResponse = client => {
  return {
    id: client.id,
    name: client.name,
    url: client.data.url,
    isActive: client.is_active
  };
};

export default buildCreateResponse;
