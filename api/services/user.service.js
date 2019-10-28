const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getResult = (err, res, data) => {
  if (err) res.send(err);
  res.json(data);
};

exports.findAll = (req, res) =>
  User.find({}, (err, users) => getResult(err, res, users));

exports.create = async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  user.save((err, user) => getResult(err, res, user));
};

exports.find = (req, res) =>
  User.findById(req.params.id, (err, user) => getResult(err, res, user));

exports.update = (req, res) =>
  User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, user) => getResult(err, res, user)
  );

exports.delete = (req, res) =>
  User.findByIdAndRemove({ _id: req.params.id }, (err, result) =>
    getResult(err, res, { message: "Le produit est supprimé avec succès !" })
  );
