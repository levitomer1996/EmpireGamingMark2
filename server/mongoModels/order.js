let mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  products: { type: Array, required: true },
  total: { type: Number, required: true },
  name: {
    type: String,
    required: true
  },
  OwnerEmail: {
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
  time_Created: {
    type: String,
    required: true
  },

  arrival_Time: {
    type: String,
    required: true
  },
  lastDigits: { type: Number, required: true }
});

let order = (module.exports = mongoose.model("order", orderSchema));
