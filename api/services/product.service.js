const Product = require("./../models/product.model");

const getResult = (err, res, data) => {
  if (err) res.send(err);
  res.json(data);
};

exports.findAll = (req, res) =>
  Product.find({}, (err, products) => getResult(err, res, products)).populate(
    "attributeId"
  );

exports.create = (req, res) => {
  const product = new Product(req.body);
  product.save((err, product) => getResult(err, res, product));
};

exports.find = (req, res) => {
  Product.findById(req.params.id, (err, product) =>
    getResult(err, res, product)
  ).populate("attributeId");
};

exports.update = (req, res) => {
  Product.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, product) => getResult(err, res, product)
  );
};

exports.delete = (req, res) => {
  Product.findByIdAndRemove({ _id: req.params.id }, (err, result) =>
    getResult(err, res, { message: "Le produit est supprimé avec succès !" })
  );
};
