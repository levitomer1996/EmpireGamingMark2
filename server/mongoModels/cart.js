let mongoose = require("mongoose");

let cartSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
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

let cart = (module.exports = mongoose.model("cart", cartSchema));
