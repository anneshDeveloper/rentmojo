export const userMapper = (userData) => {
  return userData.map((user) => {
    return {
      key: user.id,
      name: user.name,
      company: user.company.name,
      post: user.id,
    };
  });
};

export const postMapper = (postData) => {
  return postData.map((post) => {
    return {
      key: post.id,
      title: post.title,
      description: post.body,
      "view-details": post.id,
    };
  });
};
