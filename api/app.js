const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Category = require("./models/category.model");

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./routes/routes");

routes(app);

// app.get("/", (req, res) => res.send("Hello World !!!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
