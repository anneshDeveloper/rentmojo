const baseUrl = "https://jsonplaceholder.typicode.com";

export const getCommentByPostId = (id) => {
  return fetch(`${baseUrl}/comments?postId=${id}`, { method: "GET" })
    .then((res) => res.json())
    .then((res) => res);
};