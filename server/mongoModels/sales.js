let mongoose = require("mongoose");

let saleSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

let sale = (module.exports = mongoose.model("sale", saleSchema));
