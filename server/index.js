const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));
app.use(express.json());

var sales = require("./routes/sales");
var users = require("./routes/users");
var products = require("./routes/products");
var cart = require("./routes/cart");

app.use("/sales", sales);
app.use("/users", users);
app.use("/products", products);
app.use("/cart", cart);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Empire Gaming is running on ${port}!`));
