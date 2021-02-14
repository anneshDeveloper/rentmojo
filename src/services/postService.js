const baseUrl = "https://jsonplaceholder.typicode.com";

export const getPostByUserId = (id) => {
  return fetch(`${baseUrl}/posts?userId=${id}`, { method: "GET" })
    .then((res) => res.json())
    .then((res) => res);
};

export const getPostByPostId = (id) => {
  return fetch(`${baseUrl}/posts/${id}`, { method: "GET" })
    .then((res) => res.json())
    .then((res) => res);
};

export const deletePostByPostId = (id) => {
    return fetch(`${baseUrl}/posts/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => res);
  };
