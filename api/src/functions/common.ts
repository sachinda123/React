import { Response } from "express";

module.exports = {
  sendResponse: (res: Response, status: number, message: any, data = false) => {
    let senddata;
    if (data == true) {
      senddata = message;
    } else {
      senddata = {
        message: message,
      };
    }
    res.status(status).json(senddata);
    res.end();
  },
  isValidEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
};
