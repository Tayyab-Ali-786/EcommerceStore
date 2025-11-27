```
const userModel = require("../../models/user");
const ApiResponse = require("../../utils/ApiResponse");

const updateUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const { name, phone } = req.body;

        // Users can only update their own profile unless they're admin
        if (req.user._id.toString() !== userid && !req.user.isAdmin) {
            return res.status(403).json(
                new ApiResponse(403, null, "Access denied.")
            );
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;

        const user = await userModel.findByIdAndUpdate(
            userid,
            updateData,
            { new: true, runValidators: true }
        ).select("-password -otp -otpExpiry -passwordResetToken -passwordResetExpiry -refreshTokens");

        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "User not found.")
            );
        }

        res.status(200).json(
            new ApiResponse(200, user, "User updated successfully.")
        );
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json(
            new ApiResponse(500, null, error.message || "Failed to update user.")
        );
    }
};

module.exports = updateUser;
```