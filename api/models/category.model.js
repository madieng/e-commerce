const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Category", CategorySchema);
