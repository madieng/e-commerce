module.exports = app => {
  const CategoryController = require("./../controllers/category.controller");

  // Collection operations
  app.route("/categories").get(CategoryController.findAll);
  app.route("/categories").post(CategoryController.create);
  // Item operations
  app.route("/categories/:id").get(CategoryController.find);
  app.route("/categories/:id").put(CategoryController.update);
  app.route("/categories/:id").delete(CategoryController.delete);
};
