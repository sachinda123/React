import React, { useState, useEffect } from "react";

const WishList = () => {
  // useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="wish-list-container">
        <button onClick="" className="reverseButton">
          Home
        </button>
        {">"} ddd
        <button>fffff</button>
        {/* <div className="movie-detail-right">
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
      </div> */}
      </div>
    </div>
  );
};

export default WishList;
