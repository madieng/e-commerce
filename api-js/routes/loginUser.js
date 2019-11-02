const User = require("./../models/user.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./../config/jwt.config");

module.exports = app => {
  app.post("/loginUser", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.login(user, { session: false }, err => {
          if (err) {
            return next(err);
          }
          const payload = {
            id: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            roles: user.roles
          };
          const token = jwt.sign(payload, jwtSecret.secret);
          return res.status(200).json({
            auth: true,
            token: token,
            message: "user found & logged in"
          });
        });
      }
    })(req, res, next);
  });
};
