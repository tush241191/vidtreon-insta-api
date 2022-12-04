const buildUserResponse = user => {
  if (user) {
    const userData = {
      id: user.id,
      userName: user.email, //@TODO perhaps we could refactor this out and just use email from the payload
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      country: user.data.country,
      position: user.data.position,
      instaToken: user.insta_token,
      isActive: user.is_active,
      lastLoginAt: user.last_login_at
    };

    return userData;
  }

  return {};
};

export default buildUserResponse;
