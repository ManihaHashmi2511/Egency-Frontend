import axios from "axios";

axios.defaults.timeout = 15000;


axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config.__isRetry) {
      return Promise.reject(error);
    }

    const isTimeoutOrNetworkError = error.code === "ECONNABORTED" || !error.response;

    if (isTimeoutOrNetworkError) {
      config.__isRetry = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return axios(config);
    }

    return Promise.reject(error);
  }
);