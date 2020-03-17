const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Cart Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: [
    {
      name: {
        type: String
        // ref:'products
      },
      price: {
        type: Number
      },
      count: {
        type: Number,
        default: 1
      }
    }
  ],

  total: {
    type: String
  }
});

module.exports = Cart = mongoose.model("carts", CartSchema);
