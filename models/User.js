const mongoos = require("mongoose");
const Schema = mongoos.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  }
});

module.exports = User = mongoos.model("users", UserSchema);
