var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

let product = require("../mongoModels/products");

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: false
});

var db = mongoose.connection;

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

router.post("/newproduct", (req, res) => {
  let newProd = new product({
    name: req.body.name,
    category: req.body.category,
    platform: req.body.platform,
    price: req.body.price,
    img: req.body.img,
    time_purchased: 0
  });
  db.collection("products").insertOne(newProd, function(err, prod) {
    if (err) {
      res.status(401).json({ msg: err });
    } else {
      res.status(200).json({ msg: `${req.body.name} added to data.` });
    }
  });
});

router.post("/editproduct", (req, res) => {
  console.log(req.body);
  product.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { upsert: true },
    function(err, doc) {
      if (err) return res.send(500, { error: err });
      return res.status(200).json({ msg: "Product Successfully edited." });
    }
  );
  console.log("work");
});

module.exports = router;
