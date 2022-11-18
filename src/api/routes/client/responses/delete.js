const buildDeleteResponse = (client, clientUsers) => {
  return {
    client: {
      id: client.id
    },
    users: clientUsers
  };
};

export default buildDeleteResponse;
