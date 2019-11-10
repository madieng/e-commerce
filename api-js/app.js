const express = require("express");
const Cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
require("./src/config/db.config");

const app = express();

const API_PORT = process.env.API_PORT || 3000;

require("./src/config/passport.config");

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(passport.initialize());

require("./src/routes/user.route")(app);
require("./src/routes/category.route")(app);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;
