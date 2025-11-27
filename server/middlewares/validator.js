const { validationResult } = require("express-validator");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Middleware to handle validation errors
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json(
            new ApiResponse(400, null, errorMessages.join(", "))
        );
    }
    next();
};

module.exports = validate;
