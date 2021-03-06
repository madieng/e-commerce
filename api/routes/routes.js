const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// const secret = require('./../config');

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Register successful.",
      user: req.user
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occured");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "top_secret");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
