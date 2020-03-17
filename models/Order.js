const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Order Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts"
  },
  restaurant: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  seat: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
