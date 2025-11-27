const ApiResponse = require("../utils/ApiResponse");

/**
 * Admin authorization middleware
 * Must be used after auth middleware
 */
const adminAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json(
            new ApiResponse(401, null, "Authentication required.")
        );
    }

    if (!req.user.isAdmin) {
        return res.status(403).json(
            new ApiResponse(403, null, "Access denied. Admin privileges required.")
        );
    }

    next();
};

module.exports = adminAuth;
