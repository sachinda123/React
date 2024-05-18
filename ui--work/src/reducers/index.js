// import { combineReducers } from "redux";
import auth from "./auth";
// import message from "./message";

// export default combineReducers({
//   auth,
// });

// src/reducers/index.js
import { combineReducers } from "redux";
import movieReducer from "./movieReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  auth,
});

export default rootReducer;
