const deleteCart = async (req, res) => {
    try {
        let { userId } = req.params;
        let deleted = await cartModel.findOneAndDelete({ userId: userId });
        if (!deleted) return res.json({ status: "cart not found", data: null });
        res.json({ status: "cart deleted", data: deleted });
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteCart;