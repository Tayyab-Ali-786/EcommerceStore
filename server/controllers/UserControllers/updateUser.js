const updateUser = async (req, res) => {
    try {
        const userid = req.params.userid;
        const user = await userModel.findOne({ _id: userid });
        if (!user) {
            return res.status(404).json({ status: "user not found" });
        }
        const { name, email } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();
        res.json({ status: "user updated", data: user });
    } catch (error) {
        console.log(error);
    }
}

module.exports = updateUser;