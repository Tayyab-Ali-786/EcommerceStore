const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");
const userModel = require("../models/user");

/**
 * Authentication middleware to verify JWT token
 */
const auth = async (req, res, next) => {
    try {
        // Get token from header or cookie
        let token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json(
                new ApiResponse(401, null, "Access denied. No token provided.")
            );
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await userModel.findById(decoded.userId).select("-password -otp -otpExpiry -passwordResetToken -passwordResetExpiry");

        if (!user) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid token. User not found.")
            );
        }

        if (!user.isVerified) {
            return res.status(403).json(
                new ApiResponse(403, null, "Please verify your email first.")
            );
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid token.")
            );
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json(
                new ApiResponse(401, null, "Token expired. Please login again.")
            );
        }
        return res.status(500).json(
            new ApiResponse(500, null, "Authentication failed.")
        );
    }
};

module.exports = auth;
