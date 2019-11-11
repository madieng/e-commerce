const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const CategorySchema = new Schema({
  label: {
    type: String,
    required: "Le nom de la catégorie est obligatoire."
  },
  createdAt: {
    type: Date,
    default: moment()
  },
  status: {
    type: {
      type: String,
      enum: ["Actif", "Inactif"],
      default: "Actif"
    }
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Category", CategorySchema);
