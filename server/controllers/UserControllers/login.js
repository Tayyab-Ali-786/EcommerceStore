const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * User login with email and password
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid email or password.")
            );
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(403).json(
                new ApiResponse(403, null, "Please verify your email first.")
            );
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid email or password.")
            );
        }

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
                    phone: user.phone,
                    isAdmin: user.isAdmin
                },
                accessToken,
                refreshToken
            }, "Login successful!")
        );
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Login failed. Please try again.")
        );
    }
};

module.exports = login;
