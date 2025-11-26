const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ecommerceStore")

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    imageUrl: String,
    stock:
    {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("product", productSchema);