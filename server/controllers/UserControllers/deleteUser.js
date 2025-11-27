const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

const deleteUser = async (req, res) => {
    try {
        const { userid } = req.params;

        const user = await userModel.findByIdAndDelete(userid);

        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found.")
            );
        }

        res.status(200).json(
            new ApiResponse(200, null, "User deleted successfully.")
        );
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to delete user.")
        );
    }
};

module.exports = deleteUser;