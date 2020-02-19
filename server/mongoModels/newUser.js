let mongoose = require("mongoose");

let newUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

let newUser = (module.exports = mongoose.model("newUser", newUserSchema));
