var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var moment = require("moment");
var CreditCard = require("credit-card");

let cart = require("../mongoModels/cart");
let product = require("../mongoModels/products");
let order = require("../mongoModels/order");

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: false
});
var db = mongoose.connection;

router.get("/get", (req, res) => {
  // cart.find({}, function(err, carts) {
  //   res.send(carts);
  // });
  var validation = CreditCard.validate(card);
  res.send(validation);
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
    console.log(cart);
    product.find({ _id: { $in: cart.products } }, function(error, prod) {
      if (error) console.log(error);
      if (prod.length > 0) {
        let priceSum = prod[0].price;
        for (let i = 1; i < prod.length; i++) {
          priceSum = prod[i].price + priceSum;
        }
        res.status(200).json({ prod, total: priceSum });
      } else {
        let priceSum = 0;
        res.status(200).json({ prod, total: priceSum });
      }
    });
  });
});

//Get Specific product
router.post("/getprod", (req, res) => {
  product.find({ _id: { $in: req.body.id } }, function(err, prod) {
    console.log(prod);
    res.status(200).send(prod);
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

//Handle orders
function checkCardValid(c) {
  return new Promise((resolve, reject) => {
    let isCardValid = CreditCard.validate(c);
    if (!isCardValid.validCardNumber) {
      reject("Number is invalid");
    } else if (isCardValid.isExpired) {
      reject("Card is expired");
    } else if (!isCardValid.validCvv) {
      reject("Invalid CVV");
    } else if (!isCardValid.validExpiryMonth) {
      reject("Invalid Date");
    } else if (!isCardValid.validExpiryYear) {
      reject("Invalid Date");
    } else {
      resolve();
    }
  });
}
router.post("/checkcc", async (req, res) => {
  try {
    let card = {
      cardType: "VISA",
      number: req.body.number,
      expiryMonth: "0" + req.body.expMonth,
      expiryYear: req.body.expYear,
      cvv: req.body.cvv
    };
    let isValid = await checkCardValid(card);

    res.status(200).send({ status: 200, card });
  } catch (err) {
    res.send({ err });
  }
});
router.post("/temporaryorder", (req, res) => {
  db.collection("users").findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    res.status(200).json({ user });
  });
});

router.post("/createorder", (req, res) => {
  db.collection("users").findOne(
    { email: `${req.body.email}` },
    (err, user) => {
      console.log(user);
      let requestedOrder = new order({
        total: req.body.total,
        name: user.fname + " " + user.lname,
        OwnerEmail: user.email,
        city: user.city,
        street: user.adress,
        time_Created: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
        arrival_Time: moment(Date.now())
          .add(30, "days")
          .format("ll"),
        products: req.body.products,
        lastDigits: req.body.lastFour
      });
      db.collection("orders").insertOne(requestedOrder, function(err, a) {
        console.log(a);
        res.status(200).send(a.ops[0]._id);
      });
    }
  );
});

//Get Order data:
router.get("/getorder/:id", (req, res) => {
  console.log(req.params.id);

  db.collection("orders").find({ _id: req.params.id }, (er, order) => {
    console.log(order);
  });
});
module.exports = router;
