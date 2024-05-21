import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE, RESET_ERROR } from "../actions/listGetActions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listGetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default listGetReducer;
