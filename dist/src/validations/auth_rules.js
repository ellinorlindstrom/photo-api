"use strict";
/**
 * Validation rules for authentication
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRules = void 0;
const express_validator_1 = require("express-validator");
exports.loginRules = [
    (0, express_validator_1.body)('email')
        .trim().isEmail().withMessage('email has to be a valid email'),
    (0, express_validator_1.body)('password')
        .isString().withMessage('password has to be a string').bail()
        .trim().notEmpty().withMessage('password is required'),
];
