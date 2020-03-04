let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  OwnerEmail: {
    type: String,
    required: true
  },
  time_Created: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  arrival_Time: {
    type: String,
    required: true
  },
  products: { type: Array, required: true },
  lastDigits: { type: Number, required: true },
  total: { type: Number, required: true }
});

let newOrder = (module.exports = mongoose.model("newOrder", orderSchema));
