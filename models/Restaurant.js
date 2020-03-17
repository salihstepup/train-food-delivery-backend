const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RestaurantSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = Restaurant = mongoose.model("restaurants", RestaurantSchema);
