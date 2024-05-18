import axios from "axios";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "1d1142b197d7530599940e329d7d795c";

const getSingleMovie = async (id) => {
  try {
    const response = await axios.get(API_URL + `/movie/${id}?api_key=${API_KEY}&language=en-US`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
export { getSingleMovie };
