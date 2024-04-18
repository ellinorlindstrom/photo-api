"use strict";
/**
 * Photo service
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
exports.deletePhoto = exports.updatePhoto = exports.createPhoto = exports.getPhoto = exports.getPhotos = void 0;
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Get all photos
 */
const getPhotos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.findMany({
        where: {
            userId: userId,
        },
    });
});
exports.getPhotos = getPhotos;
/**
 * Get a single Photo
 *
 * @param PhotoId
 */
const getPhoto = (photoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.findUniqueOrThrow({
        where: {
            id: photoId,
            userId: userId,
        },
    });
});
exports.getPhoto = getPhoto;
/**
 * Create a new Photo
 *
 * @param data Photo data
 */
const createPhoto = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.create({
        data: Object.assign(Object.assign({}, data), { userId: userId }),
    });
});
exports.createPhoto = createPhoto;
/**
 * Update a photo
 *
 * @param photoId (to update)
 *
 */
const updatePhoto = (photoId, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.update({
        where: {
            id: photoId,
            userId: userId,
        },
        data,
    });
});
exports.updatePhoto = updatePhoto;
/**
 * Delete a photo
 *
 * @param photoId (to delete)
 */
const deletePhoto = (photoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.photo.delete({
        where: {
            id: photoId,
            userId: userId,
        },
    });
});
exports.deletePhoto = deletePhoto;
