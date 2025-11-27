const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Logout user and invalidate refresh token
 */
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const userId = req.user._id;

        // Find user and remove refresh token
        const user = await userModel.findById(userId);
        if (user && refreshToken) {
            user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);
            await user.save();
        }

        res.status(200).json(
            new ApiResponse(200, null, "Logout successful.")
        );
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Logout failed.")
        );
    }
};

module.exports = logout;
