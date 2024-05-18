import axios from "axios";
const API_URL = "https://api.themoviedb.org/3/";
const Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDExNDJiMTk3ZDc1MzA1OTk5NDBlMzI5ZDdkNzk1YyIsInN1YiI6IjY2NDQ1MzgwZGVkNGM2MmNjZWNmOGU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5TEewFqT3zcgaJoQTN55lEri2rNOMvR7vF0W-sXu4Bs";

const getMovies = async (pageId) => {
  try {
    const response = await axios.get(API_URL + `/movie/popular?language=en-US&page=${pageId}`, {
      headers: {
        Authorization: "Bearer " + Token,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
const getSingleMovie = async (id) => {
  try {
    const response = await axios.get(API_URL + `/movie/${id}?language=en-US`, {
      headers: {
        Authorization: "Bearer " + Token,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
export { getMovies, getSingleMovie };
