import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import signupReducer from "./signupReducer";
import listAddReducer from "./listAddReducer";
import listGetReducer from "./listGetReducer";
import listDeleteReducer from "./listDeleteReducer";

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  signup: signupReducer,
  listadd: listAddReducer,
  listget: listGetReducer,
  listdelete: listDeleteReducer,
});
