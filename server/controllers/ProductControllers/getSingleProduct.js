const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productModel.findById(productId);
        if (!product) return res.json({ status: "product not found", data: null });
        res.json({ status: "product fetched", data: product });
    } catch (error) {
        console.log(error);
    }
}

module.exports = singleProduct;