import axios from "axios";
import { API_URL } from "../config/url.config";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const ERROR_RESET = "ERROR_RESET";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL + "auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("error.response.data ", error.response.data);

    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT", payload: null });
};
export const clearMsg = () => (dispatch) => {
  dispatch({ type: "ERROR_RESET", payload: null });
};
