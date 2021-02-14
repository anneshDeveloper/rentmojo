const baseUrl = "https://jsonplaceholder.typicode.com";

export const getAllUser = () => {
  return fetch(baseUrl + "/users", { method: "GET" })
    .then((res) => res.json())
    .then((res) => res);
};

export const getUserById = (userId) => {
  return fetch(baseUrl + "/users/" + userId, { method: "GET" })
    .then((res) => res.json())
    .then((res) => res);
};
