const product = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ status: "products fetched", data: products });
    } catch (error) {
        console.log(error);
    }
}

module.exports = product;