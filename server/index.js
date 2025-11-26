const express = require("express");
const app = express();
const userModel = require("./models/user");
const productModel = require("./models/product");
const cartModel = require("./models/cart");
const orderModel = require("./models/orderModel");
const addUser = require("./controllers/UserControllers/addUser");
const addProduct = require("./controllers/ProductControllers/addProduct");
const addCart = require("./controllers/CartController/addCart");
const getCart = require("./controllers/CartController/getCart");
const deleteCart = require("./controllers/CartController/deleteCart");
const searchCart = require("./controllers/CartController/SearchCart");
const searchOrders = require("./controllers/OrderController/searchOrder");
const searchDeletedOrders = require("./controllers/OrderController/deleteOrder");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
  res.send("Testing server");
})
//user, product, cart, order routes
app.route("/addUser").post(addUser);
app.route("/addProduct").post(addProduct);


app.route("/addCart").post(addCart);
app.route("/getCart/:userId").get(getCart);
app.route("/deleteCart/:userId").delete(deleteCart);
app.route("/cart/:userId/clear").delete(searchCart);


app.route("/orders/:userId").get(searchOrders);

app.route("/order/:userId").delete(searchDeletedOrders);


const PORT = 3000
app.listen(PORT, () => {
  console.log("chl rha he");
})