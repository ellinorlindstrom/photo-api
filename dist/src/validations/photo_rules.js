"use strict";
/**
 * Validation rules for photo resource
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhotoRules = exports.createPhotoRules = void 0;
const express_validator_1 = require("express-validator");
exports.createPhotoRules = [
    // title required + trimmed + at least 3 chars
    (0, express_validator_1.body)('title')
        .isString().withMessage('Title must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),
    // url required + trimmed + valid url
    (0, express_validator_1.body)("url")
        .trim().isURL().withMessage('url has to be a valid url'),
    (0, express_validator_1.body)('userId')
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('userId must be a number'),
    (0, express_validator_1.body)('comment')
        .optional()
        .isString().withMessage('Comment must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Comment must be between 3 and 191 characters'),
];
exports.updatePhotoRules = [
    (0, express_validator_1.body)('title')
        .optional()
        .isString().withMessage('Title must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),
    (0, express_validator_1.body)('url')
        .optional()
        .trim().isURL().withMessage('url has to be a valid url'),
    (0, express_validator_1.body)('userId')
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('userId must be a number'),
    (0, express_validator_1.body)('comment')
        .optional()
        .isString().withMessage('Comment must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Comment must be between 3 and 191 characters'),
];
