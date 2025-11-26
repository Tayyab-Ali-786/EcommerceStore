const deletedProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await productModel.deleteMany({ _id: productId });
        if (!product) {
            return res.status(404).json({ status: "product not found" });
        }
        res.json({ status: "product deleted", data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error deleting product", error: error.message });
    }
}
module.exports = deletedProduct;