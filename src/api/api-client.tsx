import { getToken } from "@/helpers/action-token";
import { apiUrl } from "@/helpers/shared";
import axios from "axios";

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers["x-auth-token"] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default { apiClient };
