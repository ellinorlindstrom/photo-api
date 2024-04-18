"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("../controllers/profile_controller");
const validate_request_1 = __importDefault(require("../middlewares/validate_request"));
const user_rules_1 = require("../validations/user_rules");
const profile_controller_2 = require("../controllers/profile_controller");
const router = express_1.default.Router();
/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
router.get('/', profile_controller_1.getProfile);
/**
 * UPDATE /profile
 *
 * Update the authenticated user's profile
 */
router.patch('/', user_rules_1.updateUserRules, validate_request_1.default, profile_controller_1.updateProfile);
/**
 * GET /profile/photos
 *
 * Get all photos for the authenticated user
 */
router.get('/photos', profile_controller_1.getPhotos);
/**
 * GET /profile/albums
 *
 * Get all albums for the authenticated user
 */
router.get('/albums', profile_controller_2.getAlbums);
/**
 * POST /profile/photos
 *
 * Add photos to the authenticated user's profile
 */
router.post('/photos', profile_controller_1.addPhotos);
/**
 * POST /profile/albums
 *
 * Add albums to the authenticated user's profile
 */
router.post('/albums', profile_controller_2.addAlbums);
/**
 * DELETE /profile/photos/:photoId
 *
 * Remove a photo from the authenticated user's profile
 */
router.delete('/photos/:photoId', profile_controller_1.removePhoto);
/**
 * DELETE /profile/albums/:albumId
 *
 * Remove an album from the authenticated user's profile
 */
router.delete('/albums/:albumId', profile_controller_2.removeAlbum);
exports.default = router;
