const axios = require("axios");
const axiosApiInstance = axios.create();
const Swal = require("sweetalert2");

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
      localStorage.clear();
      Swal.fire({
        title: "Warning!",
        text: "Do not change the local storage",
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#7E98DF",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
