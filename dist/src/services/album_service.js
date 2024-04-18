"use strict";
/**
 * Album service
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
exports.removePhotoFromAlbum = exports.addPhotoToAlbum = exports.deleteAlbum = exports.updateAlbum = exports.createAlbum = exports.getAlbum = exports.getAlbums = void 0;
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Get all albums
 */
const getAlbums = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.findMany({
        where: {
            userId: userId,
        },
    });
});
exports.getAlbums = getAlbums;
/**
 * Get a single Album
 *
 * @param AlbumId
 */
const getAlbum = (albumId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.findUniqueOrThrow({
        where: {
            id: albumId,
            userId: userId,
        },
        include: {
            photos: true,
        },
    });
});
exports.getAlbum = getAlbum;
/**
 * Create a new Album
 *
 * @param data Album data
 */
const createAlbum = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.create({
        data: Object.assign(Object.assign({}, data), { userId: userId })
    });
});
exports.createAlbum = createAlbum;
/**
 * Update an album
 *
 * @param albumId (to update)
 * @param data Album data
 * @returns
 */
const updateAlbum = (albumId, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.update({
        where: {
            id: albumId,
            userId: userId,
        },
        data,
    });
});
exports.updateAlbum = updateAlbum;
/**
 * Delete an album
 *
 * @param albumId (to delete)
 */
const deleteAlbum = (albumId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.album.delete({
        where: {
            id: albumId,
            userId: userId,
        },
    });
});
exports.deleteAlbum = deleteAlbum;
/**
 * Link a photo to album
 *
 * @param albumId (to link)
 * @param photoId (to link)
 */
const addPhotoToAlbum = (albumId, photoIds, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //Convert photoIds to an array of objects, if its not already
    const photoIdsArray = Array.isArray(photoIds) ? photoIds : [photoIds];
    //checking if photos belong to user
    const photos = yield prisma_1.default.photo.findMany({
        where: {
            id: {
                in: photoIdsArray,
            },
            userId: userId,
        },
    });
    // If the number of photos found does not match the number of photoIds, throw an error
    if (photos.length !== photoIdsArray.length) {
        throw new Error('One or more photos do not belong to the user');
    }
    // If all photos belong to the user, connect them to the album
    const connectIds = photos.map((photo) => ({ id: photo.id }));
    return yield prisma_1.default.album.update({
        where: {
            id: albumId,
            userId: userId,
        },
        data: {
            photos: {
                connect: connectIds,
            },
        },
        include: {
            photos: true,
        },
    });
});
exports.addPhotoToAlbum = addPhotoToAlbum;
/**
 * Unlink a photo from album
 *
 * @param albumId ID of the album to unlink
 * @param photoId ID of the photo to unlink
 */
const removePhotoFromAlbum = (albumId, photoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the photo belongs to the user
    const photo = yield prisma_1.default.photo.findUnique({
        where: {
            id: photoId,
            userId: userId,
        },
    });
    // if the photo does not belong to the user, throw an error
    if (!photo) {
        throw new Error('Photo does not belong to the user');
    }
    return yield prisma_1.default.album.update({
        where: {
            id: albumId,
            userId: userId,
        },
        data: {
            photos: {
                disconnect: {
                    id: photoId,
                },
            },
        },
        include: {
            photos: true,
        }
    });
});
exports.removePhotoFromAlbum = removePhotoFromAlbum;
