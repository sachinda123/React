const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { RBAC } = require("rbac");
const { Op } = require("sequelize");
const { User } = require("./models");
const cors = require("cors");

const { Strategy, ExtractJwt } = passportJWT;

const app = express();
app.use(bodyParser.json());

// Setup Passport.js
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret_key", // Change this to a secure key in production
};
app.use(cors());

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    const currentTime = Date.now();
    // set 5 minute expair token time
    if (payload.time + 1000 * 60 * 5 < currentTime) {
      return done(null, false);
    } else {
      const user = await User.findOne({
        where: { id: payload.id },
        include: ["Role"],
        rows: true,
      });
      if (user) {
        return done(null, user.dataValues);
      } else {
        return done(null, false);
      }
    }
  })
);
app.use("/user", passport.authenticate("jwt", { session: false }), require("./routes/user"));

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { [Op.and]: [{ userName: username }, { password: password }] } });
    if (user) {
      const time = Date.now();
      const token = jwt.sign({ id: user.id, time: time }, jwtOptions.secretOrKey);

      return res.json({
        accessToken: token,
      });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const checkUserNameExist = await User.findOne({ where: { userName: username } });
    if (checkUserNameExist) {
      return res.status(400).json({ message: "username exist" });
    }
    const emailExist = await User.findOne({ where: { email: email } });
    if (emailExist) {
      return res.status(400).json({ message: "email exist" });
    }
    await User.create({ userName: username, email, password });
    return res.status(200).json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
