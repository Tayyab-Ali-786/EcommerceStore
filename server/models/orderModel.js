const mongoose = require("mongoose");
const user = require("./user");
const product = require("./product");
mongoose.connect("mongodb://localhost:27017/ecommerceStore")

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: Number,
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
})

module.exports = mongoose.model("order", orderSchema);