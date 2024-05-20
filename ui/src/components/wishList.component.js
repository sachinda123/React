import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getList, deleteList } from "../actions/listActions";
import { imageApiUrl } from "../config/url.config";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data, error } = useSelector((state) => state.list);
  const [wishList, setWishList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    setWishList(data);
  }, [data.length, selectedList.length]);

  const generateGenre = (genere) => {
    console.log("genere", genere);
    return (
      <p className="genre">
        {/* {ids?.map((id, index) => {
          const { name } = genres.find((genre) => genre.id === id);
          if (ids.length - 1 == index) {
            return name;
          } else {
            return name + "/";
          }
        })} */}
      </p>
    );
  };
  const handleRowClick = (movieId) => {
    if (selectedList.includes(movieId)) {
      setSelectedList(selectedList.filter((selectedId) => selectedId !== movieId));
    } else {
      let newList = [movieId, ...selectedList];
      setSelectedList(newList);
    }
  };

  const handleDeleteMultiple = () => {
    dispatch(deleteList(selectedList));
    dispatch(getList());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
        <button className={`rounded-button${selectedList.length > 0 ? " button-selected" : ""}`} onClick={() => handleDeleteMultiple()}>
          Remove selected
        </button>
      </div>
      {wishList.map(({ movieId, movieData }, index) => (
        <div className="row higlight" key={index}>
          <div
            className="col-1 selected-icon"
            onClick={() => {
              handleRowClick(movieId);
            }}
          >
            <i className={`bi bi-check-circle${selectedList.includes(movieId) ? "-fill" : ""}`}></i>
          </div>
          <div className="col-2">
            <img src={imageApiUrl + "/w200" + movieData.poster_path} alt="" className="wish-list-img" />
          </div>
          <div className="col-8 wish-list-title">
            {movieData.title} {new Date(movieData?.release_date).getFullYear()} {generateGenre(movieData)}
          </div>
          <div className="col-1 selected-icon">
            <i className="bi bi-trash3"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
