const express = require("express");
const app = express();
const userModel = require("./models/user");
const productModel = require("./models/product");
const cartModel = require("./models/cart");
const orderModel = require("./models/orderModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Testing server");
})
app.post("/addUser", async (req, res) => {
  let { name, email, password, isAdmin } = req.body;
  const user = new userModel({
    name,
    email,
    password,
    isAdmin
  })
  await user.save();
  res.json({ status: "user created", data: user });
})

app.post("/addProduct", async (req, res) => {
  let { title, price, description, catagory, imageUrl, stock } = req.body;
  const product = new productModel({
    title,
    price,
    description,
    catagory,
    imageUrl,
    stock
  })
  await product.save();
  res.json({ status: "product created", data: product });
})

app.post("/addCart", async (req, res) => {
  let { userId, products } = req.body;
  let cart = await cartModel.findOne({ userId: userId });
  if (!cart) {
    cart = new cartModel({
      userId,
      products,
    })
  } else {
    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }
  //
  await cart.save();
  res.json({ status: "cart updated", data: cart });
})

app.get("/getCart/:userId", async (req, res) => {
  let { userId } = req.params;
  let cart = await cartModel.findOne({ userId: userId }).populate("products.productId");
  await cart.save();
  res.json({ status: "cart fetched", data: cart });
})
app.delete("/deleteCart/:userId", async (req, res) => {
  let { userId } = req.params;
  let cart = await cartModel.findOneAndDelete({ userId: userId });
  await cart.save();
  res.json({ status: "cart deleted", data: cart });
})

app.delete("/cart/:userId/clear", async (req, res) => {
  const { userId } = req.params;

  const cart = await cartModel.findOne({ userId });

  if (!cart)
    return res.json({ status: "cart already empty" });

  cart.products = [];
  await cart.save();

  res.json({ status: "cart cleared", data: cart });
});

app.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  const cart = await cartModel.findOne({ userId }).populate("products.productId");

  if (!cart || !cart.products || cart.products.length === 0) {
    return res.json({ status: "no items in cart", data: null });
  }

  let totalPrice = 0;
  cart.products.forEach((p) => {
    const price = Number(p.productId.price) || 0;
    const quantity = Number(p.quantity) || 0;
    totalPrice += price * quantity;
  });

  const newOrder = new orderModel({
    userId,
    items: cart.products.map((p) => ({
      productId: p.productId._id,
      quantity: p.quantity,
      priceAtPurchase: p.productId.price,
    })),
    totalPrice,
    status: 'pending'
  });

  await newOrder.save();

  res.json({ status: "order created", data: newOrder });
});
app.delete("/order/:userId", async (req, res) => {
  const { userId } = req.params;

  const orders = await orderModel.findOne({ userId });

  if (!orders)
    return res.json({ status: "orders already empty" });

  orders.products = [];
  await orders.save();

  res.json({ status: "cart cleared", data: cart });
});


const PORT = 3000
app.listen(PORT, () => {
  console.log("chl rha he");
})