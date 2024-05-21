const express = require("express");
const router = express.Router();
const { sendResponse } = require("../functions/common");
const {
  models: { List },
} = require("../models");
const { Op } = require("sequelize");

const { create, checkExist, getAll, countExist, deletebyIds } = require("../functions/modelFunctions");
import { Request, Response } from "express";

interface MovieData {
  title: string;
  genre_ids: number[];
  poster_path: string;
  release_date: string;
}
interface RequstUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}
interface TypedRequestBody<T> extends Request {
  user: RequstUser;
  body: T;
}
interface WishListCreateBody {
  movieId: number;
  movieData: MovieData;
}
interface DeleteIds {
  ids: number[];
}

router.post("/", async (req: TypedRequestBody<WishListCreateBody>, res: Response) => {
  try {
    const { movieId, movieData } = req.body;
    const userId = req.user.id;
    const checkMovieExists = await checkExist({ where: { [Op.and]: [{ movieId: movieId }, { userId: userId }] } }, List);
    if (checkMovieExists) {
      return sendResponse(res, 400, { message: "Movie id alrady exist" }, true);
    }
    const newListItem = await create({ movieId, userId, movieData }, List);
    return sendResponse(res, 200, newListItem, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { message: errormsg }, true);
  }
});
router.get("/", async (req: Request, res: Response) => {
  try {
    const list = await getAll(List);
    return sendResponse(res, 200, list, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { message: errormsg }, true);
  }
});
router.delete("/", async (req: TypedRequestBody<DeleteIds>, res: Response) => {
  try {
    const deleteList = req.body.ids;
    const userId = req.user.id;
    const actualRecordCount = await countExist({ where: { [Op.and]: [{ movieId: { [Op.in]: deleteList } }, { userId: userId }] } }, List);
    if (deleteList.length !== actualRecordCount.length) {
      return sendResponse(res, 400, { message: "All list Ids not valied" }, true);
    }
    await deletebyIds(deleteList, List);
    return sendResponse(res, 200, { message: "deleted" }, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { message: errormsg }, true);
  }
});

module.exports = router;
