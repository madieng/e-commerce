const mongoose = require("mongoose");
const Attribute = require("./../models/attribute.model");

exports.findAll = (req, res) => {
  Attribute.find({}, (err, attributes) => {
    if (err) res.send(err);
    res.json(attributes);
  });
};

exports.create = (req, res) => {
  const attribute = new Attribute(req.body);
  attribute.save((err, attribute) => {
    if (err) res.send(err);
    res.json(attribute);
  });
};

exports.find = (req, res) => {
  Attribute.findById({ _id: req.params.id }, (err, attribute) => {
    if (err) res.send(err);
    res.json(attribute);
  });
};

exports.update = (req, res) => {
  Attribute.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, attribute) => {
      if (err) res.send(err);
      res.json(attribute);
    }
  );
};

exports.delete = (req, res) => {
  Attribute.findOneAndDelete({ _id: req.params.id }, (err, attribute) => {
    if (err) res.send(err);
    res.json({ message: "L'attribut est supprimé avec succès !" });
  });
};
