const productModel = require("../../models/product");
const ApiResponse = require("../../utils/ApiResponse");

const addProduct = async (req, res) => {
  try {
    let { title, price, description, category, imageUrl, stock } = req.body;

    if (!title || !price || !description || !category) {
      return res.status(400).json(
        new ApiResponse(400, null, "title, price, description, and category are required.")
      );
    }

    const product = new productModel({
      title,
      price,
      description,
      category,
      imageUrl,
      stock
    });

    await product.save();
    return res.status(201).json(
      new ApiResponse(201, product, "Product created successfully.")
    );
  } catch (error) {
    console.error("AddProduct Error:", error);
    return res.status(500).json(
      new ApiResponse(500, null, error.message || "Error creating product.")
    );
  }
}

module.exports = addProduct;