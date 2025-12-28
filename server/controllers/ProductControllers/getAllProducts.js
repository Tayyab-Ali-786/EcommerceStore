const productModel = require("../../models/product");
const ApiResponse = require("../../utils/ApiResponse");

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json(
            new ApiResponse(200, products, "Products fetched successfully.")
        );
    } catch (error) {
        console.error("GetAllProducts Error:", error);
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "Error fetching products.")
        );
    }
}

module.exports = getAllProducts;