import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import listReducer from "./listReducer";

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  list: listReducer,
});
