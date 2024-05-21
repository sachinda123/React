import { ADD_LIST_REQUEST, ADD_LIST_ADD_SUCCESS, ADD_LIST_FAILURE, LIST_ERROR_RESET } from "../actions/listAddActions";

const initialState = {
  loading: false,
  added: false,
  error: null,
};

const addListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        added: false,
      };
    case ADD_LIST_ADD_SUCCESS:
      return {
        ...state,
        added: true,
        loading: false,
        error: null,
      };
    case ADD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LIST_ERROR_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        added: false,
      };
    default:
      return state;
  }
};

export default addListReducer;
