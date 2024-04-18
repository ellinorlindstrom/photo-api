"use strict";
/**
 * Register Controller
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.refresh = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user_service");
const auth_helper_1 = require("../helpers/auth_helper");
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-boilerplate:AlbumController');
/**
 * Log in a User
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get (destruct) email and password from request body
    const { email, password } = req.body;
    // find user with email, otherwise bail 👮🏼
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
        debug('User with email %s not found', email);
        return res.status(401).send({ status: 'fail', message: 'Authorization required 👀' });
    }
    //verify credentials against hash, otherwise bail 👮🏼
    const result = yield bcrypt_1.default.compare(password, user.password);
    if (!result) {
        debug('User %s is incorrect', email);
        return res.status(401).send({ status: 'fail', message: 'Authorization required🐨' });
    }
    // create JWT-payload
    const payload = {
        sub: user.id,
        name: user.first_name && user.last_name,
        email: user.email,
    };
    // sign payload with access token secret and get token
    if (!process.env.ACCESS_TOKEN_SECRET) {
        debug('ACCESS_TOKEN_SECRET missing in environment');
        return res.status(500).send({ status: 'error', message: 'No access token secret defined' });
    }
    const access_token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h'
    });
    // create jwt refresh token payload
    const refreshPayload = {
        sub: user.id,
    };
    // sign payload with refresh token secret and get refresh-token
    if (!process.env.REFRESH_TOKEN_SECRET) {
        debug('REFRESH_TOKEN_SECRET missing in environment');
        return res.status(500).send({ status: 'error', message: 'No refresh token secret defined' });
    }
    const refresh_token = jsonwebtoken_1.default.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1d',
    });
    // respond with acces-token
    res.send({
        status: 'success',
        data: {
            access_token,
            refresh_token,
        },
    });
});
exports.login = login;
/**
 * Refresh access token
 *
 * Receive a refresh token and return a new access token
 *
 * Authorization: Bearer <refresh-token>
 */
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // extract and validate refresh token from request
    try {
        token = (0, auth_helper_1.extractAndValidateAuthHeader)(req, 'Bearer');
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).send({ status: 'fail', message: error.message });
        }
        return res.status(401).send({ status: 'fail', message: 'Unknown authorization error' });
    }
    // verify refresh token and extract refresh-payload otherwise bail 👮🏼
    if (!process.env.REFRESH_TOKEN_SECRET) {
        debug('REFRESH_TOKEN_SECRET missing in environment');
        return res.status(500).send({ status: 'error', message: 'No refresh token secret defined' });
    }
    try {
        //Verify token
        const refreshPayload = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        debug('Refresh payload %O', refreshPayload);
        // find user from database by id
        const user = yield (0, user_service_1.getUserById)(refreshPayload.sub);
        if (!user) {
            debug('User not found🕵️‍♀️');
            return res.status(500).send({ status: 'fail', message: 'Access denied' });
        }
        // create new access token payload
        const payload = {
            sub: user.id,
            name: user.first_name && user.last_name,
            email: user.email,
        };
        //issue new access token
        if (!process.env.ACCESS_TOKEN_SECRET) {
            debug('ACCESS_TOKEN_SECRET missing in environment');
            return res.status(500).send({ status: 'error', message: 'No access token secret defined' });
        }
        const access_token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h',
        });
        // respond with new access token
        res.send({
            status: 'success',
            data: {
                access_token,
            },
        });
    }
    catch (error) {
        debug('JWT Verify failed: %O', error);
        return res.status(401).send({ status: 'fail', message: 'Authorization required' });
    }
});
exports.refresh = refresh;
/**
 * Register a User
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get only the validated data from the request
    const validData = (0, express_validator_1.matchedData)(req);
    debug('Validated data %O', validData);
    // Calculate a hash + salt for the password
    const hashedPassword = yield bcrypt_1.default.hash(validData.password, Number(process.env.SALT_ROUNDS) || 10);
    debug('Password hashed successfully.');
    const data = Object.assign(Object.assign({}, validData), { password: hashedPassword });
    // Store the user in the database
    try {
        const user = yield (0, user_service_1.createUser)(data);
        const { password, id } = user, userData = __rest(user, ["password", "id"]);
        res.status(201).send({ status: 'success', data: userData });
    }
    catch (error) {
        debug('Error when trying to create User: %O', error);
        return res.status(500).send({ status: 'error', message: 'Could not create user in database' });
    }
});
exports.register = register;
