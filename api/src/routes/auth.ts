const express = require("express");
const router = express.Router();
const { sendResponse, isValidEmail } = require("../functions/common");
const {
  models: { User },
} = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
import { Request, Response } from "express";
interface TypedRequestBody<T> extends Request {
  body: T;
}
interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

router.post("/login", async (req: TypedRequestBody<{ email: string; password: string }>, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.and]: [{ email: email }, { password: password }],
      },
      attributes: ["id", "firstName", "lastName", "email"], // Specify the fields you want to retrieve
      raw: true,
    });
    if (user) {
      const time = Date.now();
      const token = jwt.sign({ id: user.id, time: time }, "my_key");

      return sendResponse(res, 200, { ...user, token }, true);
    } else {
      return sendResponse(res, 401, { message: "Invalid username or password" }, true);
    }
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { message: errormsg }, true);
  }
});

router.post("/signup", async (req: TypedRequestBody<SignUpData>, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !isValidEmail(email)) {
      return sendResponse(res, 400, { message: "Email not valied" }, true);
    }
    const userExist = await User.findOne({ where: { email: email } });
    if (userExist) {
      return sendResponse(res, 400, { message: "Email alrady taken" }, true);
    }
    if (!password) {
      return sendResponse(res, 400, { message: "password cannot be empty" }, true);
    }
    const user = await User.create({ firstName, lastName, email, password });
    return sendResponse(res, 200, { id: user.id, firstName, lastName, email }, true);
  } catch (error) {
    let errormsg: string = "Server error";
    if (error instanceof Error) {
      errormsg = error.message;
    }
    return sendResponse(res, 500, { message: errormsg }, true);
  }
});

module.exports = router;
