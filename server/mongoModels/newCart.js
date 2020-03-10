let mongoose = require("mongoose");

let newCartSchema = mongoose.Schema({
  userOwner: {
    type: String,
    required: true
  },
  time_created: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  }
});

let newCart = (module.exports = mongoose.model("newCart", newCartSchema));
