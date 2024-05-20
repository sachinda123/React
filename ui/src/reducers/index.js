import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import listReducer from "./listReducer";
import signupReducer from "./signupReducer";

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  list: listReducer,
  signup: signupReducer,
});
