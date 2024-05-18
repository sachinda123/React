import axios from "axios";

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

const API_KEY = "1d1142b197d7530599940e329d7d795c";

export const fetchMovies = (page) => async (dispatch) => {
  dispatch({ type: FETCH_MOVIES_REQUEST });

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    dispatch({ type: FETCH_MOVIES_SUCCESS, payload: response.data.results });
  } catch (error) {
    dispatch({ type: FETCH_MOVIES_FAILURE, error });
  }
};
