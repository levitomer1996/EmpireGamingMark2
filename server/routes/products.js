var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

let product = require("../mongoModels/products");

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: false
});

router.get("/", (req, res) => {
  res.send("Products route is work");
});
router.get("/get", (req, res) => {
  product.find({}, function(err, products) {
    if (product == null) {
      res.send("No products");
    }
    res.send(products);
  });
});

module.exports = router;
