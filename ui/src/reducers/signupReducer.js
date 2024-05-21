import { SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_ERROR_RESET } from "../actions/signupActions";

const initialState = {
  signSucess: false,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signSucess: true,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signSucess: false,
        error: action.payload,
      };
    case SIGNUP_ERROR_RESET:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default signupReducer;
