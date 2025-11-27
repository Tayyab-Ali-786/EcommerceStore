const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Change password for authenticated user
 */
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found.")
            );
        }

        // Verify current password
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(401).json(
                new ApiResponse(401, null, "Current password is incorrect.")
            );
        }

        // Update password
        user.password = newPassword;

        // Clear all refresh tokens for security
        user.refreshTokens = [];

        await user.save();

        res.status(200).json(
            new ApiResponse(200, null, "Password changed successfully. Please login again.")
        );
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to change password.")
        );
    }
};

module.exports = changePassword;
