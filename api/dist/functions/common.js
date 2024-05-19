"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    sendResponse: (res, status, message, data = false) => {
        let senddata;
        if (data == true) {
            senddata = message;
        }
        else {
            senddata = {
                message: message,
            };
        }
        res.status(status).json(senddata);
        res.end();
    },
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
};
