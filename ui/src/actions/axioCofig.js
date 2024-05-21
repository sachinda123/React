import axios from "axios";
import { API_URL } from "../config/url.config";

export const getAxioInstance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return axiosInstance;
  } else {
    return false;
  }
};
