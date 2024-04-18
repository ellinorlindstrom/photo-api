"use strict";
/**
 * Album Controller
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
exports.removePhoto = exports.addPhotos = exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const debug_1 = __importDefault(require("debug"));
const album_service_1 = require("../services/album_service");
const express_validator_1 = require("express-validator");
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-boilerplate:AlbumController');
/**
 * Get all albums
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const userId = req.token.sub;
    try {
        const albums = yield (0, album_service_1.getAlbums)(userId);
        res.send({ status: 'success', data: albums });
    }
    catch (error) {
        debug('Error when trying to query for all Albums: %O', error);
        res.status(500).json({ status: 'error', message: 'Something went wrong when querying the database!! 🐰' });
    }
});
exports.index = index;
/**
 * Get a single Album
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const albumId = Number(req.params.albumId);
    const userId = req.token.sub;
    try {
        const album = yield (0, album_service_1.getAlbum)(albumId, userId);
        if (album) {
            // Omitting userId from the album object
            const { userId } = album, albumData = __rest(album, ["userId"]);
            res.send({ status: 'success', data: albumData });
        }
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Album not found' });
        }
        else {
            debug('Error when trying to query for Album with ID %d: %O', albumId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🐸' });
        }
    }
});
exports.show = show;
/**
 * Create a new Album
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token || typeof req.token.sub === 'undefined') {
        return res.status(401).send('No authenticated user found');
    }
    // Get only validated data
    const validData = (0, express_validator_1.matchedData)(req);
    const userId = req.token.sub;
    try {
        const albums = yield (0, album_service_1.createAlbum)(validData, userId);
        res.status(201).send({ status: 'success', data: albums });
    }
    catch (error) {
        console.error("Detailed error: ", error);
        debug('Error when trying to create Album: %O', error);
        res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🦉' });
    }
});
exports.store = store;
/**
 * Update an album
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const albumId = Number(req.params.albumId);
    const validData = (0, express_validator_1.matchedData)(req);
    const userId = req.token.sub;
    try {
        const album = yield (0, album_service_1.updateAlbum)(albumId, validData, userId);
        res.status(200).send({ status: 'success', data: album });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Album not found' });
        }
        else {
            debug('Error when trying to update Album with ID %d: %O', albumId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🐽' });
        }
    }
});
exports.update = update;
/**
 * Delete an album
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const albumId = Number(req.params.albumId);
    const userId = req.token.sub;
    try {
        yield (0, album_service_1.deleteAlbum)(albumId, userId);
        res.status(200).send({ status: 'success', data: {} });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Album not found' });
        }
        else {
            debug('Error when trying to delete Album with ID %d: %O', albumId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database... 🐼' });
        }
    }
});
exports.destroy = destroy;
/**
 * Add Photos to an Album
 */
const addPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send({ status: 'error', message: 'No authenticated user found' });
    }
    const albumId = Number(req.params.albumId);
    const photoIdsInput = Array.isArray(req.body) ? req.body : [req.body];
    const photoIds = photoIdsInput.map(item => item.id);
    const userId = req.token.sub;
    try {
        yield (0, album_service_1.addPhotoToAlbum)(albumId, photoIds, userId);
        res.status(201).send({ status: 'success', data: null });
    }
    catch (error) {
        console.error('Error when trying to add Photos to Album: ', error);
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Album or Photo not found' });
        }
        else {
            debug('Error when trying to add Photos to Album with ID %d: %O', albumId, photoIds, error);
            res.status(401).send({ status: 'error', message: 'Unauthorized access or action' });
        }
    }
});
exports.addPhotos = addPhotos;
/**
 * Remove Photo from an Album
 */
const removePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.token) {
        return res.status(401).send('No authenticated user found');
    }
    const albumId = Number(req.params.albumId);
    const photoId = Number(req.params.photoId);
    const userId = req.token.sub;
    try {
        const album = yield (0, album_service_1.removePhotoFromAlbum)(albumId, photoId, userId);
        res.status(200).send({ status: 'success', data: album });
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).send({ status: 'error', message: 'Album or Photo not found' });
        }
        else {
            debug('Error when trying to remove Photo from Album with ID %d: %O', albumId, photoId, error);
            res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database..🐨' });
        }
    }
});
exports.removePhoto = removePhoto;
