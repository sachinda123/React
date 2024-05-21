import { DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, DELETE_LIST_FAILURE, DELETE_LIST_RESET_ERROR } from "../actions/listDeleteActions";

const initialState = {
  loading: false,
  deleted: false,
  error: null,
};
const listDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        deleted: false,
      };
    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        deleted: true,
        loading: false,
      };
    case DELETE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_LIST_RESET_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default listDeleteReducer;
