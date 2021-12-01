import axios from "../../utils/axios";

export const loadUserRequest = (token) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/auth/get-current-user", config)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginRequestLocal = (username, password) => {
  return new Promise((resolve, reject) => {
    const body = { username, password };

    axios
      .post("/auth/login", body)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
};

export const registerRequestLocal = (
  firstName,
  lastName,
  email,
  password,
  username
) => {
  return new Promise((resolve, reject) => {
    const body = { username, password, firstName, lastName, email };
    console.log(body);
    axios
      .post("/auth/register", body)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
};
