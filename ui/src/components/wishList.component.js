import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getList, deleteList, errorReset } from "../actions/listActions";
import { imageApiUrl } from "../config/url.config";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data, delete_error } = useSelector((state) => state.list);
  const [wishList, setWishList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    setWishList(data);
  }, [data.length, selectedList.length]);

  const generateGenre = (genere) => {
    return (
      <p className="genre">
        {genere?.map((gener, index) => {
          if (index === 0) {
            return "  -  " + gener.name;
          } else if (genere.length - 1 === index) {
            return gener.name;
          } else {
            return gener.name + "/";
          }
        })}
      </p>
    );
  };
  const handleRowClick = (movieId) => {
    dispatch(errorReset());
    if (selectedList.includes(movieId)) {
      setSelectedList(selectedList.filter((selectedId) => selectedId !== movieId));
    } else {
      let newList = [movieId, ...selectedList];
      setSelectedList(newList);
    }
  };
  const handleDeleteMultiple = (list) => {
    dispatch(errorReset());
    dispatch(deleteList(list));
    dispatch(getList());
  };
  return (
    <div className="container">
      <div className="wish-list-menu">
        <div>
          <button
            onClick={() => {
              return navigate(`/`, { replace: true });
            }}
            className="reverseButton"
          >
            Home
          </button>
          {">"} Wish List
        </div>
        <button className={`rounded-button${selectedList.length > 0 ? " button-selected" : ""}`} onClick={() => handleDeleteMultiple(selectedList)} disabled={selectedList.length === 0 ? true : false}>
          {loading ? (
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <span>Remove selected</span>
          )}
        </button>
      </div>
      {delete_error && delete_error.message ? <span className="badge bg-danger">{delete_error.message}</span> : ""}

      {wishList.length == 0 ? <span className="badge bg-info">List Empty please add more to list</span> : ""}

      {wishList.map(({ movieId, movieData }, index) => (
        <div className="row higlight" key={index}>
          <div
            className="col-1 selected-icon"
            onClick={() => {
              handleRowClick(movieId);
            }}
          >
            <i className={`bi bi-check-circle${selectedList.includes(movieId) ? "-fill" : ""} fs-3`}></i>
          </div>
          <div className="col-2">
            <img src={imageApiUrl + "/w200" + movieData.poster_path} alt="" className="wish-list-img" />
          </div>
          <div className="col-8 wish-list-title">
            {movieData.title} {new Date(movieData?.release_date).getFullYear()} {generateGenre(movieData?.genres || [])}
          </div>
          <div className="col-1 selected-icon">
            <div className="rounded-circle bg-dark p-2">
              <i className="bi bi-trash3 white-icon fs-3 " onClick={() => handleDeleteMultiple([movieId])}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
