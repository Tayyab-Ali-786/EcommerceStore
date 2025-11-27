const userModel = require("../../models/user");
const generateOTP = require("../../utils/generateOTP");
const emailService = require("../../utils/emailService");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Forgot password - send OTP for password reset
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found with this email.")
            );
        }

        if (!user.isVerified) {
            return res.status(403).json(
                new ApiResponse(403, null, "Please verify your email first.")
            );
        }

        // Generate OTP for password reset
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRE_MINUTES) || 10) * 60 * 1000);

        user.passwordResetToken = otp;
        user.passwordResetExpiry = otpExpiry;
        await user.save();

        // Send OTP email
        await emailService.sendOTP(email, otp, "reset");

        res.status(200).json(
            new ApiResponse(200, { email }, "Password reset OTP sent to your email.")
        );
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to process request. Please try again.")
        );
    }
};

module.exports = forgotPassword;
