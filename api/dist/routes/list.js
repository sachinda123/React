"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { sendResponse } = require("../functions/common");
const { models: { List }, } = require("../models");
const { Op } = require("sequelize");
const { create, checkExist, getAll, countExist, deletebyIds } = require("../functions/modelFunctions");
router.post("/", async (req, res) => {
    try {
        const { movieId, movieData } = req.body;
        const userId = req.user.id;
        const checkMovieExists = await checkExist({ where: { [Op.and]: [{ movieId: movieId }, { userId: userId }] } }, List);
        if (checkMovieExists) {
            return sendResponse(res, 400, { message: "Movie id alrady exist" }, true);
        }
        const newListItem = await create({ movieId, userId, movieData }, List);
        return sendResponse(res, 200, newListItem, true);
    }
    catch (error) {
        let errormsg = "Server error";
        if (error instanceof Error) {
            errormsg = error.message;
        }
        return sendResponse(res, 500, { message: errormsg }, true);
    }
});
router.get("/", async (req, res) => {
    try {
        const list = await getAll(List);
        return sendResponse(res, 200, list, true);
    }
    catch (error) {
        let errormsg = "Server error";
        if (error instanceof Error) {
            errormsg = error.message;
        }
        return sendResponse(res, 500, { message: errormsg }, true);
    }
});
router.delete("/", async (req, res) => {
    try {
        const deleteList = req.body.ids;
        const userId = req.user.id;
        const actualRecordCount = await countExist({ where: { [Op.and]: [{ movieId: { [Op.in]: deleteList } }, { userId: userId }] } }, List);
        if (deleteList.length !== actualRecordCount.length) {
            return sendResponse(res, 400, { message: "All list Ids not valied" }, true);
        }
        await deletebyIds(deleteList, List);
        return sendResponse(res, 200, { message: "deleted" }, true);
    }
    catch (error) {
        let errormsg = "Server error";
        if (error instanceof Error) {
            errormsg = error.message;
        }
        return sendResponse(res, 500, { message: errormsg }, true);
    }
});
module.exports = router;
