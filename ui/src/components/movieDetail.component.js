import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovie } from "../actions/movieActions";

const MovieDetail = ({ id, handle }) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.movie);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  useEffect(() => {
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
          if (genres.length - 1 == index) {
            return genre.name;
          } else {
            return genre.name + " / ";
          }
        })}
      </p>
    );
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-left">
        <button onClick={handle} className="reverseButton">
          Home
        </button>
        {">"} {movie?.title}
        <div className="movie-detail-image">
          <img src={"https://image.tmdb.org/t/p/original" + movie?.poster_path} alt="" />
        </div>
      </div>
      <div className="movie-detail-right">
        <h2>{movie?.title}</h2>
        <div className="row">
          <div className="col-10">
            <h1>{new Date(movie?.release_date).getFullYear()}</h1>
          </div>
          <div className="col-2">
            <button className="wish-list-btn">
              <i className="bi bi-bookmark-fill"></i>
            </button>
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
        <p>{movie?.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
