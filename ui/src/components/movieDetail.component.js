import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSingleMovie } from "../actions/movieActions";
import { getList } from "../actions/listGetActions";
import { addListItem, addListResetError } from "../actions/listAddActions";
import { imageApiUrl } from "../config/url.config";

const MovieDetail = ({ id, handle }) => {
  const dispatch = useDispatch();
  const { movie, loading, error } = useSelector((state) => state.movies);
  const { error: listError, added: listAdded } = useSelector((state) => state.listadd);
  const loginUser = localStorage.getItem("user");

  useEffect(() => {
    dispatch(addListResetError());
    dispatch(getSingleMovie(id));
  }, [dispatch, id]);

  const generateRating = (vote) => {
    const totalStars = 5;
    const fullStars = Math.floor(vote / 2);
    const halfStar = vote % 2 >= 1;
    return (
      <>
        {[...Array(totalStars)].map((star, index) => {
          if (index < fullStars) {
            return <i key={index} className="bi bi-star-fill"></i>;
          } else if (index === fullStars && halfStar) {
            return <i key={index} className="bi bi-star-half"></i>;
          } else {
            return <i key={index} className="bi bi-star"></i>;
          }
        })}
      </>
    );
  };
  const generateGenre = (genres) => {
    return (
      <p className="genre">
        {genres?.map((genre, index) => {
          if (genres.length - 1 === index) {
            return genre.name;
          } else {
            return genre.name + " / ";
          }
        })}
      </p>
    );
  };
  const confirmAddToWishList = () => {
    dispatch(
      addListItem({
        movieId: movie.id,
        movieData: {
          title: movie.title,
          genres: movie.genres,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        },
      })
    );
  };

  const getYear = () => {
    if (movie && movie?.release_date) {
      return new Date(movie?.release_date).getFullYear();
    }
    return "";
  };

  useEffect(() => {
    dispatch(getList());
  }, [listAdded]);

  if (loading)
    return (
      <div className="text-center loder">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading</span>
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-left">
        <button onClick={handle} className="reverseButton">
          Home
        </button>
        {">"} <span className="bd-title">{movie?.title}</span>
        <div className="movie-detail-image">
          <img src={imageApiUrl + "/original" + movie?.poster_path} alt="" className="dtl-img" />
        </div>
      </div>
      <div className="movie-detail-right">
        <h2>{movie?.title}</h2>
        <div className="row">
          <div className="col-10">
            <h1>{getYear()}</h1>
          </div>
          <div className="col-2 badge-add">
            <button className="wish-list-btn" onClick={confirmAddToWishList} disabled={!loginUser ? true : ""}>
              <i className="bi bi-bookmark-fill"></i>
            </button>
            {!loginUser && <span className="badge bg-info">log before add </span>}
            {listError && <span className="badge bg-success lbl">{listError && listError.message}</span>}
            {listAdded && <span className="badge bg-success lbl">successfuly added</span>}
          </div>
        </div>
        <div className="genre-container">
          <i className="bi bi-tag-fill rotate-90"></i>
          {generateGenre(movie?.genres)}
        </div>

        <div className="title">Reviews</div>
        <div className="row">
          <div className="col-10 vote-container">
            <div className="vote">{movie && movie.vote_average && movie.vote_average.toFixed(1)}</div>
            <div className="vote-total">/10</div>
          </div>
          <div className="col-2 star">{movie && movie.vote_average && generateRating(movie.vote_average.toFixed(1))}</div>
        </div>
        <div className="title">Synopis</div>
        <p className="synopis">{movie?.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
