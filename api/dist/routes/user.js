"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const { sendResponse, validateRequest } = require("../functions/common");
const { models: { User }, } = require("../models");
const { getAll } = require("../functions/modelFunctions");
router.get("/list/:offset/:limit", validateRequest("get-all", "user"), async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const list = await getAll(User, Number(offset), Number(limit));
        return sendResponse(res, 200, list, true);
    }
    catch (error) {
        let errormsg = "Server error";
        if (error instanceof Error) {
            errormsg = error.message;
        }
        return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${errormsg}` }, true);
    }
});
module.exports = router;
