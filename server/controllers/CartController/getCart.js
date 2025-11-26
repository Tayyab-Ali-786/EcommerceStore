const getCart = async (req, res) => {
    try {
        let { userId } = req.params;
        let cart = await cartModel.findOne({ userId: userId }).populate("products.productId");
        if (!cart) return res.json({ status: "cart not found", data: null });
        res.json({ status: "cart fetched", data: cart });
    } catch (error) {
        console.log(error); 
    }
}

module.exports = getCart;