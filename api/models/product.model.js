const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: "Le nom est obligatoire."
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
  },
  quantity: {
    type: Number,
    required: "La quantité est obligatoire."
  },
  price: {
    type: Number,
    required: "Le prix est obligatoire."
  },
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "Attribute"
  }
});

module.exports = mongoose.model("Product", ProductSchema);
