import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchMovies } from "../actions/movieActions";
import { getList } from "../actions/listGetActions";

import { logout } from "../actions/authActions";

import MovieDetail from "../components/movieDetail.component";
import MovieTable from "./movietable.component";
import Menu from "./menu.component";

import genres from "../config/genres.config";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, movies, error } = useSelector((state) => state.movies);
  const list = useSelector((state) => state.listget);
  const user = localStorage.getItem("user");

  const [movieId, setMovieId] = useState("");
  const [pageId, setPageId] = useState(1);
  const [pageIdArr, setPageIdArr] = useState([1, 2]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortOrder, setSortOrder] = useState("Asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [selectedGenere, setSelectedGenere] = useState("");
  const [logo, setLog] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies(pageId));
    dispatch(getList());
  }, [dispatch, pageId, list.length]);

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
        }
        return b.title.localeCompare(a.title);
      });
    }
    if (searchQuery) {
      filtered = filtered.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedGenere) {
      filtered = filtered.filter((movie) => {
        if (movie.genre_ids.length > 0) {
          return movie.genre_ids[0] === Number(selectedGenere);
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
      default:
    }
  };
  const getNameById = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : null;
  };

  const handlePageClick = (num) => {
    let numbers = pageIdArr;
    let maxNumber = Math.max(...numbers);
    let minNumber = Math.min(...numbers);

    if (num > 0) {
      numbers.push(maxNumber + 1);
      let minIndex = numbers.indexOf(minNumber);
      numbers.splice(minIndex, 1);
      setPageIdArr(numbers);
      setPageId(pageId + 1);
    } else {
      if (pageId > 1) {
        numbers.push(minNumber - 1);
        let maxIndex = numbers.indexOf(maxNumber);
        numbers.splice(maxIndex, 1);
        numbers.sort((a, b) => a - b);
        setPageIdArr(numbers);
        setPageId(pageId - 1);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center loder">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="main-menu">
        {user ? (
          <>
            <div>
              <span className="badge  bg-success">Weclome :- {user && JSON.parse(user).firstName}</span>
            </div>
            <div className="login-user">
              <button
                className="btn btn-outline-primary position-relative notification-btn"
                onClick={() => {
                  return navigate(`/list`);
                }}
              >
                <i className="bi bi-bookmark-fill me-1 fs-3"></i>
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {list && list.data && list.data.length ? list.data.length : 0}
                  <span className="visually-hidden"></span>
                </span>
              </button>
              <i
                className="bi bi-person-circle fs-3"
                onClick={() => {
                  dispatch(logout());
                  setLog(!logo);
                }}
              ></i>
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => {
                return navigate(`/login`);
              }}
              className="rounded-button"
            >
              Login <i className="bi bi-person-fill-exclamation fs-3"></i>
            </button>
          </div>
        )}
      </div>

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
                <button className="nav-left navigation" key="left" onClick={() => handlePageClick(-1)}>
                  &laquo;
                </button>

                {pageIdArr.map((id) => (
                  <button className={`navigation middle ${id === pageId ? "selectedbtn" : ""}`} key={id} onClick={() => handlePageClick(id)}>
                    {id}
                  </button>
                ))}

                <button className="nav-right navigation" key="right" onClick={() => handlePageClick(+1)}>
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
