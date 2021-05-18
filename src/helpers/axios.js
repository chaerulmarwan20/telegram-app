const axios = require("axios");
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      if (error.response.data.message === "Token is expired") {
        localStorage.clear();
      }
      if (error.response.data.message === "Token is not active") {
        localStorage.clear();
      }
      if (error.response.data.message === "Invalid signature") {
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
