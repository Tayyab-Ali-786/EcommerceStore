const productModel = require("../../models/product");
const ApiResponse = require("../../utils/ApiResponse");

const updatedProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { title, price, description, category, stock, imageUrl } = req.body;

        const product = await productModel.findByIdAndUpdate(
            productId,
            { title, price, description, category, stock, imageUrl },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json(
                new ApiResponse(404, null, "Product not found.")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, product, "Product updated successfully.")
        );
    } catch (error) {
        console.error("UpdateProduct Error:", error);
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "Error updating product.")
        );
    }
}

module.exports = updatedProduct;