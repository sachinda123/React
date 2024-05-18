import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import authReducer from "./auth";

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
});

export default rootReducer;
