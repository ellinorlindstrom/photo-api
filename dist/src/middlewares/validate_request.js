"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
/**
 * Validate request
 */
const validateRequest = (req, res, next) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    //if validation errors exists, respond with errors and stop request 🫸🏼
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: 'fail',
            data: validationErrors.array(),
        });
        return;
    }
    //if no validation errors, continue with next middleware 🏃🏽
    next();
};
exports.default = validateRequest;
