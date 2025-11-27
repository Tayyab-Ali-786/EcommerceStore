const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

const getSingleUser = async (req, res) => {
    try {
        const { userid } = req.params;

        // Users can only view their own profile unless they're admin
        if (req.user._id.toString() !== userid && !req.user.isAdmin) {
            return res.status(403).json(
                new ApiResponse(403, null, "Access denied.")
            );
        }

        const user = await userModel.findById(userid)
            .select("-password -otp -otpExpiry -passwordResetToken -passwordResetExpiry -refreshTokens");

        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found.")
            );
        }

        res.status(200).json(
            new ApiResponse(200, user, "User retrieved successfully.")
        );
    } catch (error) {
        console.error("Get single user error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to retrieve user.")
        );
    }
};

module.exports = getSingleUser;