const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Refresh access token using refresh token
 */
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json(
                new ApiResponse(401, null, "Refresh token required.")
            );
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Find user and check if refresh token exists
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid refresh token.")
            );
        }

        const tokenExists = user.refreshTokens.some(t => t.token === refreshToken);
        if (!tokenExists) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid or expired refresh token.")
            );
        }

        // Generate new access token
        const newAccessToken = user.generateAccessToken();

        res.status(200).json(
            new ApiResponse(200, { accessToken: newAccessToken }, "Token refreshed successfully.")
        );
    } catch (error) {
        console.error("Refresh token error:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid or expired refresh token.")
            );
        }
        res.status(500).json(
            new ApiResponse(500, null, "Failed to refresh token.")
        );
    }
};

module.exports = refreshToken;
