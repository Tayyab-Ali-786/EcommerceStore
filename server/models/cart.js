const mongoose = require("mongoose");
const user = require("./user");
const product = require("./product");
mongoose.connect("mongodb://localhost:27017/ecommerceStore")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    products: [
        { productid: mongoose.Schema.Types.ObjectId,
          ref: "product",
          quantity: {
            type: Number,
            default: 1
          }
        }
    ],
})

module.exports = mongoose.model("cart", cartSchema);