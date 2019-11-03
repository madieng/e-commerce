const User = require("../models/user.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./../config/jwt.config");

module.exports = app => {
  app.post("/users/register", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn((user, err) => {
          const { firstname, lastname, email } = req.body;
          const data = {
            firstname,
            lastname,
            email
          };
          User.findOne({ where: { email } }, (err, user) => {
            user.update(data).then(() => {
              console.log("user created in DB.");
              return res.status(200).send({ message: "user created." });
            });
          });
        });
      }
    })(req, res, next);
  });

  app.post("/users/login", (req, res, next) => {
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

  app.post("/users", (req, res, next) => {
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
