const ApiResponse = require("../utils/ApiResponse");

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json(
            new ApiResponse(400, null, errors.join(", "))
        );
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json(
            new ApiResponse(400, null, `${field} already exists.`)
        );
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json(
            new ApiResponse(400, null, "Invalid ID format.")
        );
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json(
            new ApiResponse(401, null, "Invalid token.")
        );
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json(
            new ApiResponse(401, null, "Token expired.")
        );
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json(
        new ApiResponse(statusCode, null, message)
    );
};

module.exports = errorHandler;
