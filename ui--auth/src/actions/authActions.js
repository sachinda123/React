import axios from "axios";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post("https://example.com/api/login", { username, password });
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
  }
};
