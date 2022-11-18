const buildListResponse = userList => {
  return userList.map(user => {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      isActive: user.is_active,
      lastLoginAt: user.last_login_at
    };
  });
};

export default buildListResponse;
