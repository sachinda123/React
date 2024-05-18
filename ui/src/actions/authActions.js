import axios from "axios";

const API_URL = "http://localhost:3001/";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL + "login", { username, password });
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "LOGOUT", payload: null });
};
export const clearMsg = () => (dispatch) => {
  dispatch({ type: "ERROR_RESET", payload: null });
};

// class AuthService {
//   login(username, password) {
//     return axios.post(API_URL + "login", { username, password }).then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }
//       return response.data;
//     });
//   }
