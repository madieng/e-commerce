const CategoryController = require("./../controller/category.controller");
const auth = require("./../services/auth.service");

module.exports = app => {
  app.get("/categories", auth.isAuthentificate, (req, res, next) => {
    CategoryController.findAll(req, res);
  });
};
