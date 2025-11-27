const mongoose = require("mongoose");
const user = require("./user");
const product = require("./product");
mongoose.connect("mongodb://localhost:27017/ecommerceStore")

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"]
        },
        priceAtPurchase: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Total price cannot be negative"]
    },
    shippingAddress: {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "card", "upi", "wallet"],
        default: "cod"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    trackingNumber: {
        type: String
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("order", orderSchema);