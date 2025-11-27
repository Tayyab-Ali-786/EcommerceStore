const ApiResponse = require("../../utils/ApiResponse");

/**
 * Get current user's profile
 */
const getProfile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json(
            new ApiResponse(200, {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                isVerified: user.isVerified,
                createdAt: user.createdAt
            }, "Profile retrieved successfully.")
        );
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to retrieve profile.")
        );
    }
};

module.exports = getProfile;
