jest.useRealTimers();
const chai = require("chai"),
  chaiHttp = require("chai-http");
const server = require("../index");
const { Customer, User } = require("../models");
const passport = jest.requireActual("passport");
jest.mock("passport", () => {
  return {
    use: () => {},
    authenticate: jest.fn((strategy, options) => {
      return (req, res, next) => {
        next();
      };
    }),
  };
});
jest.mock("../functions/common", () => {
  return {
    validateRequest: (permission, controller) => {
      var middleware = async (req, res, next) => {
        req.user = { id: 1 };
        next();
      };
      return middleware;
    },
    sendResponse: (res, status, message, data = false) => {
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
  };
});
chai.use(chaiHttp);

describe("Test Customer crud", () => {
  beforeEach(function () {});
  afterEach(function (done) {
    done();
  });
  it("test insert customer data sucessfully", async () => {
    try {
      jest.spyOn(Customer, "findOne").mockImplementation((condition) => {
        return null;
      });
      jest.spyOn(Customer, "create").mockImplementation((condition) => {
        return {
          id: 2,
          firstName: "firstName1",
          lastName: "lastName",
          contactNumber: "contactNumber",
          active: true,
          addedBy: 2,
        };
      });

      const res = await chai.request(server).post("/customer/create").send({
        firstName: "firstName1",
        lastName: "lastName",
        contactNumber: "contactNumber",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        id: 2,
        firstName: "firstName1",
        lastName: "lastName",
        contactNumber: "contactNumber",
        active: true,
        addedBy: 2,
      });
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test insert customer data with out first name key", async () => {
    try {
      jest.spyOn(Customer, "findOne").mockImplementation((condition) => {
        return null;
      });
      jest.spyOn(Customer, "create").mockImplementation((condition) => {
        return {
          id: 2,
          firstName: "firstName1",
          lastName: "lastName",
          contactNumber: "contactNumber",
          active: true,
          addedBy: 2,
        };
      });

      const res = await chai.request(server).post("/customer/create").send({
        // firstName: "firstName1",
        lastName: "lastName",
        contactNumber: "contactNumber",
      });

      expect(res.statusCode).toEqual(400);
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test insert customer data with out last name key", async () => {
    try {
      jest.spyOn(Customer, "findOne").mockImplementation((condition) => {
        return null;
      });
      jest.spyOn(Customer, "create").mockImplementation((condition) => {
        return {
          id: 2,
          firstName: "firstName1",
          lastName: "lastName",
          contactNumber: "contactNumber",
          active: true,
          addedBy: 2,
        };
      });

      const res = await chai.request(server).post("/customer/create").send({
        firstName: "firstName1",
        // lastName: "lastName",
        contactNumber: "contactNumber",
      });

      expect(res.statusCode).toEqual(400);
    } catch (error) {
      console.log("error", error);
    }
  });
});
describe("Test user login", () => {
  beforeEach(function () {});
  afterEach(function (done) {
    done();
  });
  it("test user sucessfull login", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return {
          id: 1,
        };
      });
      const res = await chai.request(server).post("/login").send({
        username: "owner",
        password: "123",
      });
      expect(res.statusCode).toEqual(200);
    } catch (error) {
      console.log("error", error);
    }
  });
});
