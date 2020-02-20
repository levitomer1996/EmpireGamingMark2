var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var moment = require("moment");

let cart = require("../mongoModels/cart");
let product = require("../mongoModels/products");

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: false
});
var db = mongoose.connection;

router.get("/get", (req, res) => {
  cart.find({}, function(err, carts) {
    res.send(carts);
  });
});

//Check if cart is already exist.
function checkCartExistance(owner, prod) {
  return new Promise((reso, reject) => {
    db.collection("carts").findOne({ userOwner: owner }, function(err, carts) {
      if (carts === null) {
        reso(false);
      } else if (carts.products.includes(prod)) {
        reject(`Prodcuts is already inside the cart.`);
      } else {
        reso(carts);
      }
    });
  });
}
//Handles add product or create new cart at the DB
router.post("/carthandle", async (req, res) => {
  try {
    let isExist = await checkCartExistance(
      req.body.userOwner,
      req.body.product
    );
    console.log(isExist);
    if (!isExist) {
      const requestedCart = new cart({
        userOwner: req.body.userOwner,
        time_created: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
        products: req.body.product
      });
      db.collection("carts").insertOne(requestedCart, function(err, cart) {
        if (err) throw err;
      });
      res.status(200).json("New cart created");
    } else {
      db.collection("carts").findOneAndUpdate(
        { userOwner: req.body.userOwner },
        { $push: { products: req.body.product } }
      );
      res.status(200).json(`${req.body.product} added`);
    }
  } catch (err) {
    res.json(err);
  }
});

router.post("/getusercart", (req, res) => {
  db.collection("carts").findOne({ userOwner: req.body.userName }, function(
    err,
    cart
  ) {
    product.find({ _id: { $in: cart.products } }, function(err, prod) {
      res.status(200).json(prod);
    });
  });
});

//Remove from cart:
router.post("/remove", (req, res) => {
  db.collection("carts").findOneAndUpdate(
    { userOwner: req.body.userOwner },
    { $pull: { products: req.body.product } },
    { multi: true }
  );
  res.status(200).json(`${req.body.product} Was removed`);
});

module.exports = router;
