const User = require("./../models/user.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./../config/jwt.config");

module.exports = app => {
  app.post("/findUser", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log("user found in DB from route.");
        res.status(200).send({
          auth: true,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          message: "user found in DB"
        });
      }
    })(req, res, next);
  });
};
