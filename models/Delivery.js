const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurants"
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "orders"
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = Delivery = mongoose.model("deliveries", deliverySchema);
