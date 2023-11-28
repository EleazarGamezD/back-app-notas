// ./models/category.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
categorySchema.index({ name: 1, userId: 1 }, { unique: true });
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
