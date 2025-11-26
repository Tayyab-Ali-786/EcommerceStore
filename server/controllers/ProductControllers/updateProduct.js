const updatedProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await productModel.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ status: "product not found" });
        }
        const { title, price, description, category } = req.body;
        if (title) product.title = title;
        if (price) product.price = price;
        if (description) product.description = description;
        if (category) product.category = category;
        await product.save();
        res.json({ status: "product updated", data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error updating product", error: error.message });
    }
}

module.exports = updatedProduct;