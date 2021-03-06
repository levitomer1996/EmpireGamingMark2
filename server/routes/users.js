var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");
let newUser = require("../mongoModels/newUser");
let order = require("../mongoModels/order");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const uuidv4 = require("uuid/v4");

var secret = "tomer";

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

//Verify Token.
const vt = (req, res, next) => {
  let token = req.session.token;
  console.log(token);
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      req.session.save();
      next();
    }
  });
};
router.get("/", (req, res) => {
  const accessToken = jwt.sign({ Jesus: "Christ" }, secret);
  req.session.token = accessToken;
  req.session.userEmail = "Tomer@gmail.com  ";
  req.session.logged = true;
  res.send(req.session);
});
router.get("/d", vt, (req, res) => {
  res.send(req.session);
});

router.post("/oninit", (req, res) => {
  jwt.verify(req.body.token, secret, (err, decoded) => {
    if (err) {
      res.send({ token: false, isAdmin: false });
    } else {
      if (decoded.role === "Admin") {
        res.status(200).send({ token: decoded, isAdmin: true });
      } else {
        res.status(200).send({ token: decoded, isAdmin: false });
      }
    }
  });
});

//Check user existance before inserting it to the database.
function checkUserExistance(user) {
  return new Promise((reso, rej) => {
    db.collection("users").findOne({ email: user }, function(err, results) {
      if (results === null) {
        reso("Email not taken");
      } else if (results.email === user) {
        rej(`${user} is already taken by another user.`);
      }
    });
  });
}

router.post("/checkuser", async (req, res) => {
  try {
    let data = await checkUserExistance(req.body.email);
    var hash = bcrypt.hashSync(req.body.password, salt);

    res.status(200).json({
      nextForm: true,
      message: null,
      email: req.body.email,
      password: hash
    });
  } catch (err) {
    res.json({ nextForm: false, message: err, email: null, password: null });
  }
});

router.post("/newuser", (req, res) => {
  const requestedUser = new newUser({
    email: req.body.email,
    password: req.body.password,
    fname: req.body.f_name,
    lname: req.body.l_name,
    city: req.body.city,
    adress: req.body.adress,
    role: "Customer"
  });
  db.collection("users").insertOne(requestedUser, function(err, user) {
    if (err) {
      res.status(401).send({ err });
    }
    res.status(200).send({ message: `${req.body.email} Created`, next: true });
  });
});

//Check user and password before keeping up.
function checkUser(user, password) {
  return new Promise((reso, rej) => {
    db.collection("users").findOne({ email: user }, function(err, results) {
      if (results === null) {
        rej(`${user} Not exist`);
      } else if (!bcrypt.compareSync(password, results.password)) {
        rej("Password is incorrect");
      } else {
        reso(results);
      }
    });
  });
}

router.post("/login", async (req, res) => {
  try {
    let user = await checkUser(req.body.email, req.body.password);
    const accessToken = jwt.sign(user, secret);
    var decoded = jwt.verify(accessToken, secret);
    req.session.token = accessToken;
    req.session.isLogged = true;
    req.session.save();
    if (user.role === "Admin") {
      res.status(200).json({ status: 200, token: accessToken, isAdmin: true });
    } else if (user.role === "Customer") {
      console.log("Sharon");
      res.status(200).json({ status: 200, token: accessToken, isAdmin: false });
    }
  } catch (err) {
    res.json({ message: err, status: 500 });
  }
});

router.post("/userorders", (req, res) => {
  jwt.verify(req.body.token, secret, function(err, decoded) {
    order.find({ OwnerEmail: { $in: decoded.email } }, function(
      error,
      orderList
    ) {
      res.status(200).json({ orders: orderList });
    });
  });
});
router.post("/checktoken", (req, res) => {
  // var decoded = jwt.verify(req.body.token, "tomer");
  // console.log(decoded);
  jwt.verify(req.body.token, "tomer", function(err, decoded) {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(decoded);
  });
});

module.exports = router;
