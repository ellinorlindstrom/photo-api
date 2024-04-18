"use strict";
/**
 * Validation rules for user
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRules = exports.createUserRules = void 0;
const express_validator_1 = require("express-validator");
const user_service_1 = require("../services/user_service");
exports.createUserRules = [
    // name required + trimmed + at least 3 chars
    (0, express_validator_1.body)('first_name')
        .isString().withMessage('Name must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters'),
    // name required + trimmed + at least 3 chars
    (0, express_validator_1.body)('last_name')
        .isString().withMessage('Name must be a string').bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters'),
    // email required + trimmed + valid email + unique
    (0, express_validator_1.body)("email")
        .trim().isEmail().withMessage('email has to be a valid email').bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        //check if user with same email already exists
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            //if it exists throw an error
            throw new Error('User with this email already exists');
        }
    })),
    // password required + trimmed + at least 6 chars
    (0, express_validator_1.body)('password')
        .isString().withMessage('password must be a string').bail()
        .trim().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
];
exports.updateUserRules = [
    (0, express_validator_1.body)('first_name')
        .optional()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        // check if a user with the same email already exists
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            // if it exists throw an error
            throw new Error('User with this email already exists');
        }
    })),
    (0, express_validator_1.body)('last_name')
        .optional()
        .trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        // check if a user with the same email already exists
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            // if it exists throw an error
            throw new Error('User with this email already exists');
        }
    })),
    //password required + trimmed + at least 6 chars
    (0, express_validator_1.body)('password')
        .optional()
        .isString().withMessage('password has to be a string').bail()
        .trim().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
    // email required + trimmed + valid email + unique
    (0, express_validator_1.body)("email")
        .optional()
        .trim().isEmail().withMessage('email has to be a valid email').bail()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        //check if user with same email already exists
        const user = yield (0, user_service_1.getUserByEmail)(value);
        if (user) {
            //if it exists throw an error
            throw new Error('User with this email already exists');
        }
    }))
];
