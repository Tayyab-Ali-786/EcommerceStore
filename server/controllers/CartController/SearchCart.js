const searchCart = async (req, res) => {
    try {
         const { userId } = req.params;
        
          const cart = await cartModel.findOne({ userId });
        
          if (!cart)
            return res.json({ status: "cart already empty" });
        
          cart.products = [];
          await cart.save();
        
          res.json({ status: "cart cleared", data: cart });
    } catch (error) {
        console.log(error);
    }
}

module.exports = searchCart;