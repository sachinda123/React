import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNIN_ERROR_RESET } from "../actions/signupActions";

const initialState = {
  isLoggedIn: false,
  signSucess: false,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case "SIGNIN_ERROR_RESET":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default signupReducer;
