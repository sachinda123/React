import React, { useState, useEffect } from "react";
import genres from "../config/genres.config";

const WishList = () => {
  // useEffect(() => {}, []);

  const list = [
    {
      backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
      id: 823464,
      original_title: "Godzilla x Kong: The New Empire",
      overview: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
      poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      media_type: "movie",
      adult: false,
      title: "Godzilla x Kong: The New Empire",
      original_language: "en",
      genre_ids: [878, 28, 12],
      popularity: 8350.714,
      release_date: "2024-03-27",
      video: false,
      vote_average: 7.128,
      vote_count: 1646,
    },
    {
      backdrop_path: "/4CcUgdiGe83MeqJW1NyJVmZqRrF.jpg",
      id: 937287,
      original_title: "Challengers",
      overview:
        'Tennis player turned coach Tashi has taken her husband, Art, and transformed him into a world-famous Grand Slam champion. To jolt him out of his recent losing streak, she signs him up for a "Challenger" event — close to the lowest level of pro tournament — where he finds himself standing across the net from his former best friend and Tashi\'s former boyfriend.',
      poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
      media_type: "movie",
      adult: false,
      title: "Challengers",
      original_language: "en",
      genre_ids: [10749, 18],
      popularity: 311.06,
      release_date: "2024-04-18",
      video: false,
      vote_average: 7.4,
      vote_count: 532,
    },
  ];

  // genres.map((genre) => (
  //   <option key={genre.id} value={genre.id}>
  //     {genre.name}
  //   </option>
  // ));

  // <p className="genre">
  //   {genres?.map((genre, index) => {
  //     if (genres.length - 1 == index) {
  //       return genre.name;
  //     } else {
  //       return genre.name + " / ";
  //     }
  //   })}
  // </p>;

  const generateGenre = (ids) => {
    return (
      <p className="genre">
        {ids?.map((id, index) => {
          const { name } = genres.find((genre) => genre.id === id);
          if (ids.length - 1 == index) {
            return name;
          } else {
            return name + "/";
          }
        })}
      </p>
    );
  };

  return (
    <div className="container">
      <div className="wish-list-menu">
        <div>
          <button onClick="" className="reverseButton">
            Home
          </button>
          {">"} ddd
        </div>
        <button className="rounded-button">Remove selected</button>
      </div>
      {list.map((item, index) => (
        <div class="row higlight">
          <div class="col-1 selected-icon">
            <i class="bi bi-check-circle"></i>
          </div>
          <div class="col-2">
            <img src={"https://image.tmdb.org/t/p/w200" + item.poster_path} alt="" className="wish-list-img" />
          </div>
          <div class="col-8 wish-list-title">
            {item.title} {new Date(item?.release_date).getFullYear()} {generateGenre(item.genre_ids)}
          </div>
          <div class="col-1 selected-icon">
            <i class="bi bi-trash3"></i>
          </div>
        </div>
      ))}
      {/* <div class="row">
        <div class="col-1">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <div class="col-4">2----</div>
        <div class="col-6">3 ---- </div>
        <div class="col-1">
          <i class="bi bi-trash3"></i>
        </div>
      </div> */}
    </div>
  );
};

export default WishList;
