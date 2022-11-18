const buildListResponse = clientList => {
  return clientList.map(client => {
    return {
      id: client.id,
      name: client.name,
      url: client.data.url,
      isActive: client.is_active
    };
  });
};

export default buildListResponse;
