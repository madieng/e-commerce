require("../config/db.config");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const faker = require("faker");
faker.locale = "fr";
const BCRYPT_SALT_ROUNDS = 12;

const saveUser = async (roles, length) => {
  const password = await bcrypt.hash("password", BCRYPT_SALT_ROUNDS);
  for (let index = 0; index < length; index++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const email = faker.internet.email(firstname, lastname);
    const user = new User({
      firstname,
      lastname,
      email,
      roles,
      password
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      }
      console.log(`==== User '${user.email}' est ajouté ====`);
    });
  }
};
// User
saveUser(["ROLE_USER"], 10);
// Client
saveUser(["ROLE_CUSTOMER"], 100);
// Admin
saveUser(["ROLE_ADMIN"], 5);
