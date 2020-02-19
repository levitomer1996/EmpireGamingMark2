let mongoose = require("mongoose");

let loginUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

let loginUser = (module.exports = mongoose.model("loginUser", loginUserSchema));
