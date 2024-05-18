import React, { useState, useEffect } from "react";

const MovieTable = ({ movieList, handleClick, getNameById }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(movieList);
  }, [movieList]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col-2">Image</th>
          <th scope="col-4">Title</th>
          <th scope="col-2">Genere</th>
          <th scope="col-1">Rating</th>
          <th scope="col-2">Year</th>
          <th scope="col-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {movies?.map((item, index) => (
          <tr key={index}>
            <th scope="col-2">
              <img src={"https://image.tmdb.org/t/p/w200" + item.poster_path} alt="" width="100" height="100" className="container-image" />
            </th>
            <th scope="col-4">{item.title}</th>
            <th scope="col-2">{item && item?.genre_ids && item?.genre_ids.length > 0 && getNameById(item?.genre_ids[0])}</th>
            <th scope="col-1">{item.vote_average.toFixed(1)}</th>
            <th scope="col-2">{new Date(item.release_date).getFullYear()}</th>
            <th scope="col-1" onClick={() => handleClick(item)}>
              <i className="bi bi-eye"></i>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
