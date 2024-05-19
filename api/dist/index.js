"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { models: { User, Role }, } = require("./models");
const { Strategy, ExtractJwt } = passportJWT;
const app = express();
app.use(bodyParser.json());
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "my_key",
};
passport.use(new Strategy(jwtOptions, async (payload, done) => {
    const currentTime = Date.now();
    //set 5 minute expair token time
    // if (payload.time + 1000 * 60 * 5 < currentTime) {
    //   return done(null, false);
    // } else {
    const user = await User.findOne({
        where: { id: payload.id },
        rows: true,
    });
    if (user) {
        return done(null, {
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    }
    else {
        return done(null, false);
    }
    // }
}));
app.use("/list", passport.authenticate("jwt", { session: false }), require("./routes/list"));
app.use("/auth", require("./routes/auth"));
const port = process.env.PORT || 3001;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;
