const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const getResult = (err, res, result) => {
  if (err) res.send(err);

  res.json(result);
};

exports.findAll = (req, res) => {
  Category.find({}, (err, categories) =>
    getResult(err, res, categories)
  ).populate("parentId");
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => getResult(err, res, category));
};

exports.find = (req, res) => {
  Category.findById(req.params.id, (err, category) =>
    getResult(err, res, category)
  ).populate("parentId");
};

exports.update = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, category) => getResult(err, res, category)
  );
};

exports.delete = (req, res) => {
  Category.findByIdAndRemove({ _id: req.params.id }, (err, result) =>
    getResult(err, res, { message: "La catégorie est supprimée avec succès !" })
  );
};
