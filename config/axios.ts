import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "https://api.baserow.io",
  headers: {
    Authorization: "Token kmb7Zkm7acxAoyKdZ9ZPFTKl75wftcHu",
  },
});

AXIOS.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
