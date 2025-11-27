const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");
const emailService = require("../../utils/emailService");

/**
 * Verify OTP and activate user account
 */
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

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

        // Check OTP
        if (!user.otp || user.otp !== otp) {
            return res.status(400).json(
                new ApiResponse(400, null, "Invalid OTP.")
            );
        }

        // Check OTP expiry
        if (user.otpExpiry < new Date()) {
            return res.status(400).json(
                new ApiResponse(400, null, "OTP expired. Please request a new one.")
            );
        }

        // Verify user
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        // Send welcome email
        await emailService.sendWelcomeEmail(email, user.name);

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token
        user.refreshTokens.push({ token: refreshToken });
        await user.save();

        res.status(200).json(
            new ApiResponse(200, {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                accessToken,
                refreshToken
            }, "Email verified successfully! Welcome aboard.")
        );
    } catch (error) {
        console.error("Verify OTP error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Verification failed. Please try again.")
        );
    }
};

module.exports = verifyOTP;
