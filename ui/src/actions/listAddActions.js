import axios from "axios";
import { API_URL } from "../config/url.config";
import { getAxioInstance } from "./axioCofig";

export const ADD_LIST_REQUEST = "ADD_LIST_REQUEST";
export const ADD_LIST_ADD_SUCCESS = "ADD_LIST_ADD_SUCCESS";
export const ADD_LIST_FAILURE = "ADD_LIST_FAILURE";
export const LIST_ERROR_RESET = "LIST_ERROR_RESET";

export const addListItem = (Item) => async (dispatch) => {
  try {
    dispatch({ type: ADD_LIST_REQUEST, payload: null });
    const axioInstance = getAxioInstance();
    if (axioInstance) {
      await axioInstance.post(API_URL + "list/", Item);
    }
    dispatch({ type: ADD_LIST_ADD_SUCCESS, payload: null });
  } catch (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    dispatch({ type: ADD_LIST_FAILURE, payload: error.response.data });
  }
};
export const addListResetError = () => async (dispatch) => {
  dispatch({ type: LIST_ERROR_RESET, payload: null });
};
