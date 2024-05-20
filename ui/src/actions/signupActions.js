import axios from "axios";
import { API_URL } from "../config/url.config";

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNIN_ERROR_RESET = "SIGNIN_ERROR_RESET";

export const signup = (firstName, lastName, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL + "auth/signup", { firstName, lastName, email, password });
    dispatch({ type: "SIGNIN_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "SIGNIN_FAILURE", payload: error.response.data });
  }
};
// export const logout = () => (dispatch) => {
//   localStorage.removeItem("user");
//   dispatch({ type: "LOGOUT", payload: null });
// };
// export const clearMsg = () => (dispatch) => {
//   dispatch({ type: "ERROR_RESET", payload: null });
// };
