import React, { useState, useEffect } from "react";
import MovieDetail from "../components/movieDetail.component";
import MovieTable from "./movietable.component";
import Menu from "./menu.component";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../actions/movieActions";
import genres from "../config/genres.config";

const Home = () => {
  const dispatch = useDispatch();
  const [movieId, setMovieId] = useState("");
  const [pageId, setPageId] = useState(1);
  const { loading, movies, error } = useSelector((state) => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortOrder, setSortOrder] = useState("Asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [selectedGenere, setSelectedGenere] = useState("");

  useEffect(() => {
    dispatch(fetchMovies(pageId));
  }, [dispatch, pageId]);

  useEffect(() => {
    let filtered = movies;
    if (selectedYear) {
      filtered = movies.filter((movie) => new Date(movie.release_date).getFullYear().toString() === selectedYear);
    }
    if (selectedRating) {
      filtered = filtered.filter((movie) => Math.floor(movie.vote_average) === parseInt(selectedRating));
    }
    if (sortOrder) {
      filtered = filtered.sort((a, b) => {
        if (sortOrder === "Asc") {
          return a.title.localeCompare(b.title);
        } else if (sortOrder === "Desc") {
          return b.title.localeCompare(a.title);
        }
      });
    }
    if (searchQuery) {
      filtered = filtered.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedGenere) {
      filtered = filtered.filter((movie) => {
        if (movie.genre_ids.length > 0) {
          return movie.genre_ids[0] == selectedGenere;
        }
        return false;
      });
    }
    setFilteredMovies(filtered);
  }, [selectedYear, movies, selectedRating, sortOrder, searchButtonClicked, searchQuery, selectedGenere]);

  const handleClick = (item) => {
    item ? setMovieId(item.id) : setMovieId("");
  };

  const handleChange = (type, event) => {
    switch (type) {
      case "year":
        setSelectedYear(event.target.value);
        break;
      case "rating":
        setSelectedRating(event.target.value);
        break;
      case "orderby":
        setSortOrder(event.target.value);
        break;
      case "search":
        setSearchQuery(event.target.value);
        break;
      case "searchBtn":
        setSearchButtonClicked(!searchButtonClicked);
        break;
      case "genre":
        setSelectedGenere(event.target.value);
        break;
    }
  };
  const getNameById = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : null;
  };

  const handlePageClick = (id) => {
    console.log("page click", id);

    //  setPageId(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <nav class="navbar navbar-light bg-light">
        {/* <a class="navbar-brand" href="#">
          Navbar
        </a> */}
        <div>
          <a href="/login">Lovin</a>

          <i class="bi bi-bookmark-fill"></i>
          <i class="bi bi-person-circle"></i>
          <i class="bi bi-box-arrow-right"></i>
        </div>
      </nav>
      <div className="container">
        {!movieId ? (
          <>
            <Menu
              handleChange={handleChange}
              selectedYear={selectedYear}
              selectedRating={selectedRating}
              sortOrder={sortOrder}
              searchQuery={searchQuery}
              genres={genres}
              selectedGenere={selectedGenere}
            />
            <MovieTable movieList={filteredMovies} handleClick={handleClick} getNameById={getNameById} />
            {!movieId && (
              <div className="pagination">
                <button className="nav-left navigation" onClick={() => handlePageClick(-1)}>
                  &laquo;
                </button>
                <button className="navigation middle" onClick={() => handlePageClick(1)}>
                  1
                </button>
                <button className="navigation middle" onClick={() => handlePageClick(2)}>
                  2
                </button>
                <button className="nav-right navigation" onClick={() => handlePageClick(1)}>
                  &raquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <MovieDetail id={movieId} handle={handleClick} key={movieId} />
        )}
      </div>
    </>
  );
};

export default Home;
