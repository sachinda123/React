import axios from "axios";
import { API_URL } from "../config/url.config";
import { getAxioInstance } from "./axioCofig";

export const DELETE_LIST_REQUEST = "DELETE_LIST_REQUEST";
export const DELETE_LIST_SUCCESS = "DELETE_LIST_SUCCESS";
export const DELETE_LIST_FAILURE = "DELETE_LIST_FAILURE";
export const DELETE_LIST_RESET_ERROR = "DELETE_LIST_RESET_ERROR";

export const deleteList = (list) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LIST_REQUEST, payload: "" });
    const axioInstance = getAxioInstance();
    if (axioInstance) {
      await axioInstance.delete(API_URL + "list/", {
        data: {
          ids: list,
        },
      });
    }
    dispatch({ type: DELETE_LIST_SUCCESS, payload: "" });
  } catch (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("user");
    }
    dispatch({ type: DELETE_LIST_FAILURE, payload: error.response.data });
  }
};

export const errorReset = () => async (dispatch) => {
  dispatch({ type: DELETE_LIST_RESET_ERROR, payload: null });
};
