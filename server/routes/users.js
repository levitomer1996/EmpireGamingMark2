var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");
let newUser = require("../mongoModels/newUser");

mongoose.connect("mongodb://localhost/EmpireGaming", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

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

router.post("/register", async (req, res) => {
  try {
    let data = await checkUserExistance(req.body.email);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const requestedUser = new newUser({
      email: req.body.email,
      password: hash,
      fname: req.body.fname,
      lname: req.body.lname,
      city: req.body.city,
      adress: req.body.adress,
      role: "Cutomer"
    });
    db.collection("users").insertOne(requestedUser, function(err, res) {
      if (err) throw err;
    });

    res.status(200).json({ status: 200, name: "Tomer" });
  } catch (err) {
    res.json({ status: 500, message: err });
  }
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
    const accessToken = jwt.sign(user, "tomer");
    var decoded = jwt.verify(accessToken, "tomer");

    res.status(200).json({ status: 200, token: accessToken });
  } catch (err) {
    res.json({ message: err, status: 500 });
  }
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
