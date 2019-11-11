const mongoose = require("mongoose");
const User = require("../models/user.model");

const findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

module.exports = {
  findAll
};
