import axios from "axios";
import { API_URL } from "../config/url.config";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_ERROR_RESET = "SIGNUP_ERROR_RESET";

export const signup = (firstName, lastName, email, password) => async (dispatch) => {
  try {
    await axios.post(API_URL + "auth/signup", { firstName, lastName, email, password });
    dispatch({ type: "SIGNUP_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "SIGNUP_FAILURE", payload: error.response.data });
  }
};
export const clearMsg = () => (dispatch) => {
  dispatch({ type: "SIGNUP_ERROR_RESET", payload: null });
};
