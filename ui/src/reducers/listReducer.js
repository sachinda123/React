const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LIST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case "FETCH_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
