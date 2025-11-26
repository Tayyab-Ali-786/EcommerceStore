const searchDeletedOrders = async (req, res) => {
    try {
        const deleted = await orderModel.deleteMany({ userId });

        if (deleted.deletedCount === 0) {
            return res.json({ status: "orders already empty" });
        }

        res.json({ status: "orders cleared", deletedCount: deleted.deletedCount });
    } catch (error) {
        console.log(error);
    }
}

module.exports = searchDeletedOrders;