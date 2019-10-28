module.exports = app => {
  const CategoryController = require("./../controllers/category.controller");
  const AttributeController = require("./../controllers/attribute.controller");
  const ProductController = require("./../controllers/product.controller");
  const UserController = require("./../controllers/user.controller");

  // Category
  app.route("/categories").get(CategoryController.findAll);
  app.route("/categories").post(CategoryController.create);
  app.route("/categories/:id").get(CategoryController.find);
  app.route("/categories/:id").put(CategoryController.update);
  app.route("/categories/:id").delete(CategoryController.delete);
  // Attribute
  app.route("/attributes").get(AttributeController.findAll);
  app.route("/attributes").post(AttributeController.create);
  app.route("/attributes/:id").get(AttributeController.find);
  app.route("/attributes/:id").put(AttributeController.update);
  app.route("/attributes/:id").delete(AttributeController.delete);
  // Product
  app.route("/products").get(ProductController.findAll);
  app.route("/products").post(ProductController.create);
  app.route("/products/:id").get(ProductController.find);
  app.route("/products/:id").put(ProductController.update);
  app.route("/products/:id").delete(ProductController.delete);
  // User
  app.route("/users").get(UserController.findAll);
  app.route("/users").post(UserController.create);
  app.route("/users/:id").get(UserController.find);
  app.route("/users/:id").put(UserController.update);
  app.route("/users/:id").delete(UserController.delete);
};
