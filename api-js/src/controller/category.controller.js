const mongoose = require("mongoose");
const Category = require("./../models/category.model");

const findAll = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      res.send(err);
    }
    res.json(categories);
  });
};

module.exports = {
  findAll
};
