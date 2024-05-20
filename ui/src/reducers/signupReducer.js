import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNIN_ERROR_RESET } from "../actions/signupActions";

const initialState = {
  signSucess: false,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signSucess: true,
        error: null,
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        signSucess: false,
        error: action.payload,
      };
    case SIGNIN_ERROR_RESET:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default signupReducer;
