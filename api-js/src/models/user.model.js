// const config = require("config");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const BCRYPT_SALT_ROUNDS = 12;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: "Le prénom est obligatoire."
  },
  lastname: {
    type: String,
    required: "Le nom est obligatoire."
  },
  email: {
    type: String,
    required: "L'adresse email est obligatoire."
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  roles: {
    type: [
      {
        type: String,
        enum: ["ROLE_USER", "ROLE_CUSTOMER", "ROLE_ADMIN"]
      }
    ],
    default: ["ROLE_USER"]
  }
});

module.exports = mongoose.model("User", UserSchema);
