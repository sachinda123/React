const express = require("express");
const router = express.Router();
const { sendResponse, validateRequest } = require("../functions/common");
const { User } = require("../models");

const { getAll } = require("../functions/modelFunctions");

router.get("/all/", validateRequest("get-all", "user"), async (req, res) => {
  try {
    const list = await getAll(User);
    return sendResponse(res, 200, list, true);
  } catch (error) {
    return sendResponse(res, 500, { code: "SERVER_ERROR", reason: `${error.message || "Server error"}` }, true);
  }
});

module.exports = router;
