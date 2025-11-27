const userModel = require("../../models/user");
const generateOTP = require("../../utils/generateOTP");
const emailService = require("../../utils/emailService");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Resend OTP for email verification
 */
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found.")
            );
        }

        if (user.isVerified) {
            return res.status(400).json(
                new ApiResponse(400, null, "Email already verified. Please login.")
            );
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRE_MINUTES) || 10) * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP email
        await emailService.sendOTP(email, otp, "verification");

        res.status(200).json(
            new ApiResponse(200, { email }, "OTP resent successfully.")
        );
    } catch (error) {
        console.error("Resend OTP error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to resend OTP. Please try again.")
        );
    }
};

module.exports = resendOTP;
