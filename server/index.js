const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "https://my-app-one-inky.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"]
  })
);

// handle preflight
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/ecommerceStore")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

const userModel = require("./models/user");
const productModel = require("./models/product");
const cartModel = require("./models/cart");
const orderModel = require("./models/orderModel");

const addUser = require("./controllers/UserControllers/addUser");
const getSingleUser = require("./controllers/UserControllers/getSingleUser");
const updateUser = require("./controllers/UserControllers/updateUser");
const deleteUser = require("./controllers/UserControllers/deleteUser");

const addProduct = require("./controllers/ProductControllers/addProduct");
const product = require("./controllers/ProductControllers/getAllProducts");
const singleProduct = require("./controllers/ProductControllers/getSingleProduct");
const updatedProduct = require("./controllers/ProductControllers/updateProduct");
const deletedProduct = require("./controllers/ProductControllers/deleteProduct");

const addCart = require("./controllers/CartController/addCart");
const getCart = require("./controllers/CartController/getCart");
const deleteCart = require("./controllers/CartController/deleteCart");
const searchCart = require("./controllers/CartController/SearchCart");

const searchOrders = require("./controllers/OrderController/searchOrder");
const searchDeletedOrders = require("./controllers/OrderController/deleteOrder");

app.get("/", (req, res) => {
  res.send("Testing server");
});

app.route("/addUser").post(addUser);
app.route("/users/:userid").get(getSingleUser);
app.route("/users/update/:userid").put(updateUser);
app.route("/users/delete/:userid").delete(deleteUser);

app.route("/addProduct").post(addProduct);
app.route("/products").get(product);
app.route("/products/:productId").get(singleProduct);
app.route("/products/update/:productId").put(updatedProduct);
app.route("/products/delete/:productId").delete(deletedProduct);

app.route("/addCart").post(addCart);
app.route("/getCart/:userId").get(getCart);
app.route("/deleteCart/:userId").delete(deleteCart);
app.route("/cart/:userId/clear").delete(searchCart);

app.route("/orders/:userId").get(searchOrders);
app.route("/order/:userId").delete(searchDeletedOrders);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
