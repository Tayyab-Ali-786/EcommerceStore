const userModel = require("../../models/user");
const generateOTP = require("../../utils/generateOTP");
const emailService = require("../../utils/emailService");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * User signup with OTP verification
 */
const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json(
                    new ApiResponse(400, null, "Email already registered. Please login.")
                );
            } else {
                // User exists but not verified, resend OTP
                const otp = generateOTP();
                const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRE_MINUTES) || 10) * 60 * 1000);

                existingUser.otp = otp;
                existingUser.otpExpiry = otpExpiry;
                await existingUser.save();

                await emailService.sendOTP(email, otp, "verification");

                return res.status(200).json(
                    new ApiResponse(200, { email }, "OTP resent to your email. Please verify.")
                );
            }
        }

        // Create new user
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRE_MINUTES) || 10) * 60 * 1000);

        const user = new userModel({
            name,
            email,
            password,
            phone,
            otp,
            otpExpiry,
            isVerified: false
        });

        await user.save();

        // Send OTP email
        await emailService.sendOTP(email, otp, "verification");

        res.status(201).json(
            new ApiResponse(201, { email }, "Signup successful! OTP sent to your email. Please verify.")
        );
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json(
            new ApiResponse(500, null, error.message || "Signup failed. Please try again.")
        );
    }
};

module.exports = signup;
