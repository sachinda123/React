import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSingleMovie } from "../actions/movieActions";
import { getList } from "../actions/listActions";
import { addListItem, errorReset } from "../actions/listActions";
import { imageApiUrl } from "../config/url.config";

const MovieDetail = ({ id, handle }) => {
  const dispatch = useDispatch();
  const { movie, loading, error } = useSelector((state) => state.movies);
  const { error: listError, successfully_add } = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(getSingleMovie(id));
    dispatch(getList());
    dispatch(errorReset());
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
  const confirmAddToWishList = () => {
    dispatch(
      addListItem({
        movieId: movie.id,
        movieData: {
          title: movie.title,
          genre: movie.genre,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getList());
  }, [successfully_add]);

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
          <img src={imageApiUrl + "/original" + movie?.poster_path} alt="" />
        </div>
      </div>
      <div className="movie-detail-right">
        <h2>{movie?.title}</h2>
        <div className="row">
          <div className="col-10">
            <h1>{new Date(movie?.release_date).getFullYear()}</h1>
          </div>
          <div className="col-2 badge-add">
            <button className="wish-list-btn" onClick={confirmAddToWishList}>
              <i className="bi bi-bookmark-fill"></i>
            </button>
            {listError && <span className="badge bg-success lbl">{listError && listError.message}</span>}
            {successfully_add && <span className="badge bg-success lbl">successfuly added</span>}
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
