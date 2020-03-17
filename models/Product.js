const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurants"
  },
  number: {
    type: Number,
    ref: "restaurants"
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  productImage: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
