const addCart = async (req, res) => {
    try {
         let { userId, products, productId, quantity } = req.body;
          let cart = await cartModel.findOne({ userId: userId });
        
          if (!cart) {
            const initialProducts = Array.isArray(products)
              ? products
              : productId
                ? [{ productId, quantity: Number(quantity) || 1 }]
                : [];
            cart = new cartModel({
              userId,
              products: initialProducts,
            });
          } else {
            if (productId) {
              const itemIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
              );
        
              if (itemIndex > -1) {
                cart.products[itemIndex].quantity += Number(quantity) || 1;
              } else {
                cart.products.push({ productId, quantity: Number(quantity) || 1 });
              }
            } else if (Array.isArray(products)) {
              // Replace existing products with provided array
              cart.products = products;
            }
          }
        
          await cart.save();
          res.json({ status: "cart updated", data: cart });
    } catch (error) {
        console.log(error);
    }
}

module.exports = addCart;