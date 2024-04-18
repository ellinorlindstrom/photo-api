"use strict";
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
exports.removeUser = exports.removeUserAlbum = exports.addUserAlbums = exports.getUserAlbums = exports.removeUserPhoto = exports.addUserPhotos = exports.getUserPhotos = exports.updateUser = exports.createUser = exports.getUserById = exports.getUserByEmail = void 0;
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Get User by email
 *
 * @param email Email of user to get
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
});
exports.getUserByEmail = getUserByEmail;
/**
 * Get a User by id
 *
 * @param id (User id)
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
});
exports.getUserById = getUserById;
/**
 * Create a User
 *
 * @param data User data
 */
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.create({
        data,
    });
});
exports.createUser = createUser;
/**
 * Update a User
 *
 * @param userId (to update)
 * @param data User data
 * @returns
 */
const updateUser = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data,
    });
});
exports.updateUser = updateUser;
/**
 * Get a User's Photos
 *
 * @param userId (User id)
 */
const getUserPhotos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        select: {
            photos: true,
        },
        where: {
            id: userId,
        },
    });
    return user.photos;
});
exports.getUserPhotos = getUserPhotos;
/**
 * Add Photos to a User
 *
 * @param userId (User id)
 * @param photoIds Photo ID(s) to link
 */
const addUserPhotos = (userId, photoIds) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        select: {
            photos: true,
        },
        where: {
            id: userId,
        },
        data: {
            photos: {
                connect: photoIds,
            },
        },
    });
    return user.photos;
});
exports.addUserPhotos = addUserPhotos;
/**
 * Remove Photo from a User
 *
 * @param userId (User id)
 * @param photoId Photo ID to unlink
 */
const removeUserPhoto = (userId, photoId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        select: {
            photos: true,
        },
        where: {
            id: userId,
        },
        data: {
            photos: {
                disconnect: {
                    id: photoId,
                },
            },
        },
    });
    return user.photos;
});
exports.removeUserPhoto = removeUserPhoto;
/**
 * Get a User's Albums
 *
 * @param userId (User id)
 */
const getUserAlbums = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        select: {
            albums: true,
        },
        where: {
            id: userId,
        },
    });
    return user.albums;
});
exports.getUserAlbums = getUserAlbums;
/**
 * Add Albums to a User
 *
 * @param userId (User id)
 * @param albumIds Album ID(s) to link
 */
const addUserAlbums = (userId, albumIds) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        select: {
            albums: true,
        },
        where: {
            id: userId,
        },
        data: {
            albums: {
                connect: albumIds,
            },
        },
    });
    return user.albums;
});
exports.addUserAlbums = addUserAlbums;
/**
 * Remove Album from a User
 *
 * @param userId (User id)
 * @param albumId Photo ID to unlink
 */
const removeUserAlbum = (userId, albumId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        select: {
            albums: true,
        },
        where: {
            id: userId,
        },
        data: {
            albums: {
                disconnect: {
                    id: albumId,
                },
            },
        },
    });
    return user.albums;
});
exports.removeUserAlbum = removeUserAlbum;
/**
 * Remove a User
 *
 * @param userId (User id)
 */
const removeUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.delete({
        where: {
            id: userId,
        },
    });
});
exports.removeUser = removeUser;
