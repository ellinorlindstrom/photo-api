"use strict";
/**
 * Authentication helpers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAndValidateAuthHeader = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('prisma-photos:auth_helper');
const extractAndValidateAuthHeader = (req, expectedType) => {
    var _a;
    if (!req.headers.authorization) {
        debug('Authorization header missing');
        throw new Error('Authorization header missing');
    }
    const [authSchema, payload] = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ");
    if (authSchema !== expectedType) {
        debug("Authorization schema isn't of expected type %s", expectedType);
        throw new Error(`Expected ${expectedType} authentication`);
    }
    return payload;
};
exports.extractAndValidateAuthHeader = extractAndValidateAuthHeader;
