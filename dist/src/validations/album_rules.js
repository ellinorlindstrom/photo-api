"use strict";
/**
 * Validation rules for photo resource
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAlbumRules = exports.createAlbumRules = void 0;
const express_validator_1 = require("express-validator");
exports.createAlbumRules = [
    // title required + trimmed + at least 3 chars
    (0, express_validator_1.body)('title')
        .isString().withMessage('Title must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),
];
exports.updateAlbumRules = [
    (0, express_validator_1.body)('title')
        .optional()
        .isString().withMessage('Title must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),
];
