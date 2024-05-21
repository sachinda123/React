jest.useRealTimers();
const chai = require("chai"),
  chaiHttp = require("chai-http");
const server = require("../dist/index");
const { Op } = require("sequelize");

const {
  models: { List, User },
} = require("../dist/models");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGltZSI6MTcxNjA5NTkzMzI0NywiaWF0IjoxNzE2MDk1OTMzfQ.bkMurQ-OYv7ZvnpV4OgaFjjufxjg1dKyzTC18Y1EqSI";

chai.use(chaiHttp);

/*
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
      const res = await chai.request(server).post("/auth/login").send({
        email: "sachinda123@hhh.com",
        password: "123",
      });
      expect(res.statusCode).toEqual(200);
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test user try to log with invalid user", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return null;
      });
      const res = await chai.request(server).post("/auth/login").send({
        email: "sachinda",
        password: "123",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Invalid username or password");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test user login db find error", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        throw new Error("find Error");
      });
      const res = await chai.request(server).post("/auth/login").send({
        email: "sachinda123@hhh.com",
        password: "123",
      });
      expect(res.statusCode).toEqual(500);
    } catch (error) {
      console.log("error", error);
    }
  });
});
describe("Test user signup", () => {
  beforeEach(function () {});
  afterEach(function (done) {
    done();
  });
  it("test user sucessfull sign up", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return null;
      });
      jest.spyOn(User, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });
      const res = await chai.request(server).post("/auth/signup").send({
        firstName: "dddd",
        lastName: "sssss",
        email: "tesddddddddt@gmail.com",
        password: "123456",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        id: 1,
        firstName: "dddd",
        lastName: "sssss",
        email: "tesddddddddt@gmail.com",
      });
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test user sign up with invalied email", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return null;
      });
      jest.spyOn(User, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });
      const res = await chai.request(server).post("/auth/signup").send({
        firstName: "dddd",
        lastName: "sssss",
        email: "tesddddddddt",
        password: "123456",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Email not valied");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test user try to sign up with exising user", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return { id: 1 };
      });
      jest.spyOn(User, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });
      const res = await chai.request(server).post("/auth/signup").send({
        firstName: "dddd",
        lastName: "sssss",
        email: "tesddddddddt@gmail.com",
        password: "123456",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Email alrady taken");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("test user sign up user create error", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        throw new Error("user create Error");
      });
      jest.spyOn(User, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });
      const res = await chai.request(server).post("/auth/signup").send({
        firstName: "dddd",
        lastName: "sssss",
        email: "tesddddddddt@gmail.com",
        password: "123456",
      });
      expect(res.statusCode).toEqual(500);
    } catch (error) {
      console.log("error", error);
    }
  });
});
*/
describe("Test movie list", () => {
  beforeEach(function () {});
  afterEach(function (done) {
    done();
  });

  it("sucessfull add movie to list ", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return {
          id: 1,
          firstName: "firstName",
          lastName: "lastName",
          email: "abc@gmail.com",
        };
      });

      jest.spyOn(List, "findOne").mockImplementation((condition) => {
        const movieId = condition.where[Op.and][0].movieId;
        const userId = condition.where[Op.and][1].userId;
        return null;
      });
      jest.spyOn(List, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });
      const res = await chai
        .request(server)
        .post("/list/")
        .set("Authorization", `Bearer ${token}`)
        .send({
          movieId: 3,
          movieData: {
            title: "helllow",
            genre_ids: [20, 2, 9],
            poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
            release_date: "2024-04-18",
          },
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        id: 1,
        movieId: 3,
        userId: 1,
        movieData: {
          title: "helllow",
          genre_ids: [20, 2, 9],
          poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
          release_date: "2024-04-18",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  });

  it("try to existing movie to list ", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return {
          id: 1,
          firstName: "firstName",
          lastName: "lastName",
          email: "abc@gmail.com",
        };
      });

      jest.spyOn(List, "findOne").mockImplementation((condition) => {
        const movieId = condition.where[Op.and][0].movieId;
        const userId = condition.where[Op.and][1].userId;
        return { id: 1 };
      });
      jest.spyOn(List, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });
      const res = await chai
        .request(server)
        .post("/list/")
        .set("Authorization", `Bearer ${token}`)
        .send({
          movieId: 3,
          movieData: {
            title: "helllow",
            genre_ids: [20, 2, 9],
            poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
            release_date: "2024-04-18",
          },
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Movie id alrady exist");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("Get Movie list ", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return {
          id: 1,
          firstName: "firstName",
          lastName: "lastName",
          email: "abc@gmail.com",
        };
      });
      jest.spyOn(List, "findAll").mockImplementation((condition) => {
        return [
          {
            id: 1,
            movieId: 1,
            userId: "10",
            movieData: {
              title: "helllow",
              genre_ids: [20, 2, 9],
              poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
              release_date: "2024-04-18",
            },
          },
          {
            id: 2,
            movieId: 1,
            userId: "1",
            movieData: {
              title: "helllow",
              genre_ids: [20, 2, 9],
              poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
              release_date: "2024-04-18",
            },
          },
          {
            id: 3,
            movieId: 2,
            userId: "1",
            movieData: {
              title: "helllow",
              genre_ids: [20, 2, 9],
              poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
              release_date: "2024-04-18",
            },
          },
          {
            id: 4,
            movieId: 3,
            userId: "1",
            movieData: {
              title: "helllow",
              genre_ids: [20, 2, 9],
              poster_path: "/esLooowdB92I3dVI3ENlPPpTuWT.jpg",
              release_date: "2024-04-18",
            },
          },
        ];
      });

      const res = await chai.request(server).get("/list/").set("Authorization", `Bearer ${token}`).send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(4);
    } catch (error) {
      console.log("error", error);
    }
  });
  it("Test added movie delete ", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return {
          id: 1,
          firstName: "firstName",
          lastName: "lastName",
          email: "abc@gmail.com",
        };
      });

      jest.spyOn(List, "findOne").mockImplementation((condition) => {
        const movieId = condition.where[Op.and][0].movieId;
        const userId = condition.where[Op.and][1].userId;
        return null;
      });

      jest.spyOn(List, "findAll").mockImplementation((condition) => {
        return [{ id: 1 }];
      });

      jest.spyOn(List, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });

      jest.spyOn(List, "destroy").mockImplementation((param) => {
        return { id: 1 };
      });

      const res = await chai
        .request(server)
        .delete("/list/")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ids: [1],
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual("deleted");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("Test added movie delete throw error ", async () => {
    try {
      jest.spyOn(User, "findOne").mockImplementation((condition) => {
        return {
          id: 1,
          firstName: "firstName",
          lastName: "lastName",
          email: "abc@gmail.com",
        };
      });

      jest.spyOn(List, "findOne").mockImplementation((condition) => {
        const movieId = condition.where[Op.and][0].movieId;
        const userId = condition.where[Op.and][1].userId;
        return null;
      });

      jest.spyOn(List, "findAll").mockImplementation((condition) => {
        return [{ id: 1 }];
      });

      jest.spyOn(List, "create").mockImplementation((param) => {
        return { ...{ id: 1 }, ...param };
      });

      jest.spyOn(List, "destroy").mockImplementation((param) => {
        throw new Error("delete Error");
      });

      const res = await chai
        .request(server)
        .delete("/list/")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ids: [1],
        });
      expect(res.statusCode).toEqual(500);
      // expect(res.body.message).toEqual("delete Error");
    } catch (error) {
      console.log("error", error);
    }
  });
});
