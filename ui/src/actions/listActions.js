import axios from "axios";
const API_URL = "http://localhost:3001/";

export const getList = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_LIST_REQUEST", payload: null });
    const user = JSON.parse(localStorage.getItem("user"));
    const axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const response = await axiosInstance.get(API_URL + "list/");
    dispatch({ type: "FETCH_LIST_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_LIST_FAILURE", payload: error.response.data });
  }
};
