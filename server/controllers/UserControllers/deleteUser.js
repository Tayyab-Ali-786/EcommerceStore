const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userid;
        const user = await userModel.deleteMany({ _id: userId });
        if (!user) return res.json({ status: "user not found", data: null });
        res.json({ status: "user deleted", data: user });
    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteUser;