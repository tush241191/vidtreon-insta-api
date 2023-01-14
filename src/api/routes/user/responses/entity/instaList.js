const buildInstaListResponse = instaList => {
  return instaList.map(insta => {
    return {
      id: insta.id,
      userId: insta.user_id,
      tenant: insta.tenant,
      caption: insta.caption,
      feedId: insta.feed_id,
      mediaType: insta.media_type,
      mediaUrl: insta.media_url,
      title: insta.title,
      desciption: insta.desciption,
      data: insta.data,
      status: insta.status,
      isActive: insta.is_active
    };
  });
};

export default buildInstaListResponse;
