const config = require("config");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, roles: this.roles[0] },
    config.get("myprivatekey")
  ); //get the private key from the config file -> environment variable
  return token;
};

UserSchema.pre("save", async next => {
  // const user = this;
  // On encode le mot de passe
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async password => {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);
