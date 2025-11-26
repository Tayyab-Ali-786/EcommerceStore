const searchOrders = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
}

module.exports = searchOrders;