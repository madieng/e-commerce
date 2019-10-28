const config = require("config");
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

module.exports = mongoose.model("User", UserSchema);

//function to validate user
// function validateUser(user) {
//     const schema = {
//       name: Joi.string().min(3).max(50).required(),
//       email: Joi.string().min(5).max(255).required().email(),
//       password: Joi.string().min(3).max(255).required()
//     };

//     return Joi.validate(user, schema);
//   }

//   exports.User = User;
//   exports.validate = validateUser;
