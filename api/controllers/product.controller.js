const productService = require("./../services/product.service");

exports.findAll = (req, res) => productService.findAll(req, res);
exports.create = (req, res) => productService.create(req, res);
exports.find = (req, res) => productService.find(req, res);
exports.update = (req, res) => productService.update(req, res);
exports.delete = (req, res) => productService.delete(req, res);
