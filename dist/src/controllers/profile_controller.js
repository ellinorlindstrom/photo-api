"use strict";
/**
 * Profile Controller
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
exports.removeAlbum = exports.addAlbums = exports.getAlbums = exports.removePhoto = exports.addPhotos = exports.getPhotos = exports.updateProfile = exports.getProfile = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const debug_1 = __importDefault(require("debug"));
const user_service_1 = require("../services/user_service");
const user_service_2 = require("../services/user_service");
const express_validator_1 = require("express-validator");
const debug = (0, debug_1.default)('prisma-boilerplate:ProfileController');
/**
 * Get the authenticated users profile
 */
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes the token from the request, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    // get current user profile
    const user = yield (0, user_service_2.getUserById)(req.token.sub);
    if (user) {
        // Destructure the password out of the response, and capturing the rest of the properties in `userData`
        const { password } = user, userData = __rest(user, ["password"]);
        // Responding with 200 Ok + status success, excluding the password
        res.status(200).send({ status: 'success', data: userData });
    }
    else {
        // Handle the case where createUser returned null
        res.status(404).send({ status: 'error', message: 'User not created' });
    }
});
exports.getProfile = getProfile;
/**
 * Update the authenticated users profile
 */
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes the token from the request, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    // Get only validated data
    const validData = (0, express_validator_1.matchedData)(req);
    //if user wants to update password, hash it and salt it 🥨
    if (validData.password) {
        validData.password = yield bcrypt_1.default.hash(validData.password, Number(process.env.SALT_ROUNDS) || 10);
    }
    try {
        const user = yield (0, user_service_2.updateUser)(req.token.sub, validData);
        const { password } = user, userData = __rest(user, ["password"]);
        res.status(200).send({ status: 'success', data: userData });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'User not found' });
        }
        else {
            debug('Error when trying to update User with ID %d: %O', req.token.sub, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database' });
        }
    }
});
exports.updateProfile = updateProfile;
/**
 * Get the authenticated users photos
 */
const getPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes the token from the request, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    const userId = req.token.sub;
    try {
        const photos = yield (0, user_service_2.getUserPhotos)(userId);
        res.send({
            status: 'success',
            data: photos
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when querying the database'
        });
    }
});
exports.getPhotos = getPhotos;
/**
 * Add Photos to the authenticated User
 */
const addPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes the authentication for the route, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    const userId = req.token.sub;
    const photoIds = req.body.photoIds;
    try {
        const photos = yield (0, user_service_2.addUserPhotos)(userId, photoIds);
        res.send({
            status: 'success',
            data: photos
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when querying the database'
        });
    }
});
exports.addPhotos = addPhotos;
/**
 * Remove a Photo from the authenticated User
 */
const removePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes authentication from the route, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    const userId = req.token.sub;
    const photoId = Number(req.params.photoId);
    try {
        const photos = yield (0, user_service_2.removeUserPhoto)(userId, photoId);
        res.send({
            status: 'success',
            data: photos
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when querying the database'
        });
    }
});
exports.removePhoto = removePhoto;
/**
 * Get the authenticated users albums
 */
const getAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes the token from the request, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    const userId = req.token.sub;
    try {
        const albums = yield (0, user_service_1.getUserAlbums)(userId);
        res.send({
            status: 'success',
            data: albums
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when querying the database'
        });
    }
});
exports.getAlbums = getAlbums;
/**
 * Add Albums to the authenticated User
 */
const addAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes the authentication for the route, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    const userId = req.token.sub;
    const albumIds = req.body.albumIds;
    try {
        const albums = yield (0, user_service_1.addUserAlbums)(userId, albumIds);
        res.send({
            status: 'success',
            data: albums
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when querying the database'
        });
    }
});
exports.addAlbums = addAlbums;
/**
 * Remove the authenticated user's album
 */
const removeAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if someone removes authentication from the route, throw an error
    if (!req.token) {
        throw new Error('No authenticated user found');
    }
    const userId = req.token.sub;
    const albumId = Number(req.params.albumId);
    try {
        const albums = yield (0, user_service_1.removeUserAlbum)(userId, albumId);
        res.send({
            status: 'success',
            data: albums
        });
    }
    catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Something went wrong when querying the database'
        });
    }
});
exports.removeAlbum = removeAlbum;
