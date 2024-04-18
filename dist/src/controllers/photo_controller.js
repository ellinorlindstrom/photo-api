"use strict";
/**
 * Photo Controller
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
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const debug_1 = __importDefault(require("debug"));
const photo_service_1 = require("../services/photo_service");
const express_validator_1 = require("express-validator");
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-boilerplate:PhotoController');
/**
 * Get all photos
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const userId = req.token.sub;
    try {
        const photos = yield (0, photo_service_1.getPhotos)(userId);
        if (photos) {
            // Omitting userId from each photo object in the array
            const photosData = photos.map(photo => {
                const { userId } = photo, photoData = __rest(photo, ["userId"]);
                return photoData; // Returning the modified object without userId
            });
            // Sending back the response without the userId in each photo object
            res.send({ status: 'success', data: photosData });
        }
    }
    catch (error) {
        debug('Error when trying to query for all Photos: %O', error);
        res.status(500).json({ status: 'error', message: 'Something went wrong when querying the database🐉' });
    }
});
exports.index = index;
/**
 * Get a single Photo
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const photoId = Number(req.params.photoId);
    const userId = req.token.sub;
    try {
        const photo = yield (0, photo_service_1.getPhoto)(photoId, userId);
        if (photo) {
            // Omitting userId from the photo object
            const { userId } = photo, photoData = __rest(photo, ["userId"]);
            // Sending back the response without the userId
            res.send({ status: 'success', data: photoData });
        }
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Photo not found' });
        }
        else {
            debug('Error when trying to query for Photo with ID %d: %O', photoId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database🐰' });
        }
    }
});
exports.show = show;
/**
 * Create a new Photo
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    // Get only validated data
    const validData = (0, express_validator_1.matchedData)(req);
    const userId = req.token.sub;
    try {
        const photo = yield (0, photo_service_1.createPhoto)(validData, userId);
        res.status(201).send({ status: 'success', data: photo });
    }
    catch (error) {
        console.error("Detailed error: ", error);
        debug('Error when trying to create Photo: %O', error);
        res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database🐣' });
    }
});
exports.store = store;
/**
 * Update a photo
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const validData = (0, express_validator_1.matchedData)(req);
    const photoId = Number(req.params.photoId);
    const userId = req.token.sub;
    try {
        const photo = yield (0, photo_service_1.updatePhoto)(photoId, validData, userId);
        res.status(200).send({ status: 'success', data: photo });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Photo not found' });
        }
        else {
            debug('Error when trying to update Photo with ID %d: %O', photoId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database🐼 ' });
        }
    }
});
exports.update = update;
/**
 * Delete a photo
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const photoId = Number(req.params.photoId);
    const userId = req.token.sub;
    try {
        yield (0, photo_service_1.deletePhoto)(photoId, userId);
        res.status(200).send({ status: 'success', data: {} });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Photo not found' });
        }
        else {
            debug('Error when trying to delete Photo with ID %d: %O', photoId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🐸' });
        }
    }
});
exports.destroy = destroy;
