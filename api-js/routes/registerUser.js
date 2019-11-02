const User = require("./../models/user.model");
const passport = require("passport");

module.exports = app => {
  app.post("/registerUser", (req, res, next) => {
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
};
