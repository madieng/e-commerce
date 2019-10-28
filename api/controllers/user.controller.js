const userService = require("../services/user.service");

exports.findAll = (req, res) => userService.findAll(req, res);
exports.create = (req, res) => userService.create(req, res);
exports.find = (req, res) => userService.find(req, res);
exports.update = (req, res) => userService.update(req, res);
exports.delete = (req, res) => userService.delete(req, res);
