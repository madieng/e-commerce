const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const secureRoutes = require("./routes/secure-routes");
const passport = require("passport");
require("./auth/auth");

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  secureRoutes
);

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// app.get("/", (req, res) => res.send("Hello World !!!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
