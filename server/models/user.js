const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ecommerceStore")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("user", userSchema);