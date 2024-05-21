import axios from "axios";
import { API_URL } from "../config/url.config";
export const FETCH_LIST_REQUEST = "FETCH_LIST_REQUEST";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILURE = "FETCH_LIST_FAILURE";
export const FETCH_LIST_ADD_SUCCESS = "FETCH_LIST_ADD_SUCCESS";
export const FETCH_LIST_RESET_ERROR = "FETCH_LIST_RESET_ERROR";

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

export const getList = () => async (dispatch) => {
  try {
    const axioInstance = getAxioInstance();
    if (axioInstance) {
      dispatch({ type: FETCH_LIST_REQUEST, payload: null });
      const response = await axioInstance.get(API_URL + "list/");
      if (response && response.data) {
        dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: FETCH_LIST_SUCCESS, payload: [] });
      }
    }
  } catch (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    dispatch({ type: FETCH_LIST_FAILURE, payload: error.response.data });
  }
};

export const deleteList = (list) => async (dispatch) => {
  try {
    const axioInstance = getAxioInstance();
    if (axioInstance) {
      await axioInstance.delete(API_URL + "list/", {
        data: {
          ids: list,
        },
      });
    }
  } catch (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    console.log("error", error.response.data);
  }
};

export const addListItem = (Item) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LIST_REQUEST, payload: null });
    const axioInstance = getAxioInstance();
    if (axioInstance) {
      await axioInstance.post(API_URL + "list/", Item);
    }
    dispatch({ type: FETCH_LIST_ADD_SUCCESS, payload: null });
  } catch (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    console.log("error", error.response.data);
    dispatch({ type: FETCH_LIST_FAILURE, payload: error.response.data });
  }
};

export const errorReset = () => async (dispatch) => {
  dispatch({ type: FETCH_LIST_RESET_ERROR, payload: null });
};
