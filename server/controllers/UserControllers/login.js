const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                new ApiResponse(400, null, "Email and password are required.")
            );
        }

        const user = await userModel.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid email or password.")
            );
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid email or password.")
            );
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token to user document
        user.refreshTokens.push({ token: refreshToken });
        await user.save();

        // Remove sensitive info
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified
        };

        // Set cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 15 * 60 * 1000 // 15m
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        });

        return res.status(200).json(
            new ApiResponse(200, { user: userData, accessToken }, "Login successful.")
        );

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "Server error during login.")
        );
    }
};

module.exports = login;
