import axios from "axios";
import { API_URL } from "../config/url.config";
import { getAxioInstance } from "./axioCofig";

export const FETCH_LIST_REQUEST = "FETCH_LIST_REQUEST";
export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILURE = "FETCH_LIST_FAILURE";
export const RESET_ERROR = "RESET_ERROR";

export const getList = () => async (dispatch) => {
  try {
    const axioInstance = getAxioInstance();
    if (axioInstance) {
      dispatch({ type: FETCH_LIST_REQUEST, payload: null });
      const response = await axioInstance.get(API_URL + "list/");
      dispatch({ type: FETCH_LIST_SUCCESS, payload: response.data });
    }
  } catch (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    dispatch({ type: FETCH_LIST_FAILURE, payload: error.response.data });
  }
};

export const getListResetError = () => async (dispatch) => {
  dispatch({ type: RESET_ERROR, payload: null });
};
