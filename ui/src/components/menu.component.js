import React, { useState, useEffect } from "react";

const Menu = ({ selectedYear, handleChange, selectedRating, sortOrder, searchQuery, genres, selectedGenere }) => {
  useEffect(() => {}, []);

  const getLastTenYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  return (
    <>
      <div className="row">
        <div className="col-10">
          <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              id="search"
              value={searchQuery}
              onChange={(e) => {
                handleChange("search", e);
              }}
            />
          </div>
        </div>
        <div className="col-2 searchbtn">
          <button
            className="rounded-button"
            onClick={(e) => {
              handleChange("searchBtn", e);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="selectMenu">
        <div>
          <div>Genere:</div>
          <div>
            <select
              className="form-select rounded-button"
              id="genere"
              value={selectedGenere}
              onChange={(e) => {
                handleChange("genre", e);
              }}
            >
              <option value="">All</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>Rating:</div>
          <div>
            <select
              id="rating"
              value={selectedRating}
              onChange={(e) => {
                handleChange("rating", e);
              }}
              className="form-select rounded-button"
            >
              <option value="">All</option>
              {[...Array(11).keys()].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>Year:</div>
          <div>
            <select
              className="form-select rounded-button"
              id="year"
              value={selectedYear}
              onChange={(e) => {
                handleChange("year", e);
              }}
            >
              <option value="" selected>
                All
              </option>
              {getLastTenYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>Order By:</div>
          <div>
            <select
              className="form-select rounded-button"
              id="order"
              value={sortOrder}
              onChange={(e) => {
                handleChange("orderby", e);
              }}
            >
              <option value="Asc" selected>
                ASC
              </option>
              <option value="Desc">Desc</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
