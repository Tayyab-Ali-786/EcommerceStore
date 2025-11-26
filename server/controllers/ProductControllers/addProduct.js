const addProduct = async (req, res) => {
    try {
        let { title, price, description, catagory, imageUrl, stock } = req.body;
          const product = new productModel({
            title,
            price,
            description,
            category,
            imageUrl,
            stock
          })
          await product.save();
          res.json({ status: "product created", data: product });
    } catch (error) {
        console.log(error);   
    }
}

module.exports = addProduct;   // <-- REQUIRED