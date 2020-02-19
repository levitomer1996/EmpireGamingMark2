var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

let sale = require("../mongoModels/sales");

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: false
});

var db = mongoose.connection;
db.once("open", function() {
  console.log("connected");
});

// router.get("/", (req, res) => {
//   sale.find({}, (err, sales) => {
//     console.log(sales)
//     res.send(sales);
//   });
// });
router.get("/", (req, res) => {
  sale.find({}, function(err, sales) {
    res.send(sales);
  });
});

module.exports = router;
