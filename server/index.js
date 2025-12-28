require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI or MONGODB_URI is not defined in environment variables.");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected successfully"))
    .catch(err => {
      console.error("MongoDB Connection Error Details:");
      console.error(err);
    });
}

// Middleware to check database connection status
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1 && req.path !== '/') {
    return res.status(503).json({
      success: false,
      message: "Database connection is not established. Please check IP whitelisting in MongoDB Atlas and environment variables on Render."
    });
  }
  next();
});

const auth = require("./middlewares/auth");
const adminAuth = require("./middlewares/adminAuth");

// routes
app.get("/", (req, res) => res.send("Testing server"));

app.route("/login").post(require("./controllers/UserControllers/login"));
app.route("/addUser").post(require("./controllers/UserControllers/addUser"));
app.route("/users/:userid").get(require("./controllers/UserControllers/getSingleUser"));
app.route("/users/update/:userid").put(require("./controllers/UserControllers/updateUser"));
app.route("/users/delete/:userid").delete(require("./controllers/UserControllers/deleteUser"));

app.route("/addProduct").post(auth, adminAuth, require("./controllers/ProductControllers/addProduct"));
app.route("/products").get(require("./controllers/ProductControllers/getAllProducts"));
app.route("/products/:productId").get(require("./controllers/ProductControllers/getSingleProduct"));
app.route("/products/update/:productId").put(auth, adminAuth, require("./controllers/ProductControllers/updateProduct"));
app.route("/products/delete/:productId").delete(auth, adminAuth, require("./controllers/ProductControllers/deleteProduct"));

app.route("/addCart").post(require("./controllers/CartController/addCart"));
app.route("/getCart/:userId").get(require("./controllers/CartController/getCart"));
app.route("/deleteCart/:userId").delete(require("./controllers/CartController/deleteCart"));
app.route("/cart/:userId/clear").delete(require("./controllers/CartController/SearchCart"));

app.route("/orders/:userId").get(require("./controllers/OrderController/searchOrder"));
app.route("/order/:userId").delete(require("./controllers/OrderController/deleteOrder"));
``
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
