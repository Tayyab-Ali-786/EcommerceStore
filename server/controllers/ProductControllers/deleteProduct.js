const productModel = require("../../models/product");
const ApiResponse = require("../../utils/ApiResponse");

const deletedProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await productModel.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json(
                new ApiResponse(404, null, "Product not found.")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, product, "Product deleted successfully.")
        );
    } catch (error) {
        console.error("DeleteProduct Error:", error);
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "Error deleting product.")
        );
    }
}

module.exports = deletedProduct;