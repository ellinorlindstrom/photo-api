"use strict";
/**
 * JWT Authentication Middleware
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessToken = void 0;
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_helper_1 = require("../../helpers/auth_helper");
const debug = (0, debug_1.default)('prisma-boilerplate:jwt');
const validateAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    debug('Validating access token 🤞');
    let token;
    try {
        token = (0, auth_helper_1.extractAndValidateAuthHeader)(req, 'Bearer');
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).send({ status: 'fail', message: 'Token has expired' });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).send({ status: 'fail', message: 'Token is invalid' });
        }
        else if (error instanceof Error) {
            return res.status(401).send({ status: 'fail', message: error.message, });
        }
        else {
            return res.status(401).send({ status: 'fail', message: 'Unknown authorization error' });
        }
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        debug('ACCESS_TOKEN_SECRET missing in environment');
        return res.status(500).send({ status: 'error', message: 'No access token secret defined' });
    }
    try {
        //Verify token
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //Attach payload to request
        req.token = payload;
    }
    catch (error) {
        debug('JWT Verify failed: %O', error);
        return res.status(401).send({ status: 'fail', message: 'Authorization required' });
    }
    next();
});
exports.validateAccessToken = validateAccessToken;
