import axios from "axios";

const API_URL = "http://localhost:3001/";
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL + "auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
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
