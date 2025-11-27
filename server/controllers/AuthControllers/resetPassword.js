const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Reset password using OTP
 */
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found.")
            );
        }

        // Check OTP
        if (!user.passwordResetToken || user.passwordResetToken !== otp) {
            return res.status(400).json(
                new ApiResponse(400, null, "Invalid OTP.")
            );
        }

        // Check OTP expiry
        if (user.passwordResetExpiry < new Date()) {
            return res.status(400).json(
                new ApiResponse(400, null, "OTP expired. Please request a new one.")
            );
        }

        // Update password
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpiry = undefined;

        // Clear all refresh tokens for security
        user.refreshTokens = [];

        await user.save();

        res.status(200).json(
            new ApiResponse(200, null, "Password reset successful! Please login with your new password.")
        );
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to reset password. Please try again.")
        );
    }
};

module.exports = resetPassword;
