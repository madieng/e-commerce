const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const AttributeSchema = new Schema({
  name: {
    type: String,
    required: "Le nom est obligatoire"
  },
  createdAt: {
    type: Date,
    default: moment()
  },
  status: {
    type: [
      {
        type: String,
        enum: ["active", "inactive"]
      }
    ],
    default: "active"
  }
});

module.exports = mongoose.model("Attribute", AttributeSchema);
