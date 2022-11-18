const buildReadResponse = client => {
  return {
    id: client.id,
    name: client.name,
    url: client.data.url,
    isActive: client.is_active,
    users: client.users.map(({user}) => {
      return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name
      };
    })
  };
};

export default buildReadResponse;
