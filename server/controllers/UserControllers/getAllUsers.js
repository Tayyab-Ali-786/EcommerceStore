const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

/**
 * Get all users (Admin only)
 */
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await userModel
            .find()
            .select("-password -otp -otpExpiry -passwordResetToken -passwordResetExpiry -refreshTokens")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await userModel.countDocuments();

        res.status(200).json(
            new ApiResponse(200, {
                users,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalUsers: total,
                    limit
                }
            }, "Users retrieved successfully.")
        );
    } catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json(
            new ApiResponse(500, null, "Failed to retrieve users.")
        );
    }
};

module.exports = getAllUsers;
