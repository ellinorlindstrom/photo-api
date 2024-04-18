"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const album_controller_1 = require("../controllers/album_controller");
const validate_request_1 = __importDefault(require("../middlewares/validate_request"));
const album_rules_1 = require("../validations/album_rules");
const router = express_1.default.Router();
/**
 * GET /albums
 *
 * Get all albums
 */
router.get('/', album_controller_1.index);
/**
 * GET /albums/:albumId
 *
 * Get a single album
 */
router.get('/:albumId', album_controller_1.show);
/**
 * POST /albums
 *
 * Create a new album
 */
router.post('/', album_rules_1.createAlbumRules, validate_request_1.default, album_controller_1.store);
/**
 * PATCH /albums/:albumId
 *
 * Update an album
 */
router.patch('/:albumId', album_rules_1.updateAlbumRules, validate_request_1.default, album_controller_1.update);
/**
 * DELETE /albums/:albumId
 *
 * Delete an album
 */
router.delete('/:albumId', album_controller_1.destroy);
/**
 * POST /albums/:albumId/photos
 *
 * Add photos to an album
 */
router.post('/:albumId/photos', album_controller_1.addPhotos);
/**
 * DELETE /albums/:albumId/photos/:photoId
 *
 * Remove a photo from an album
 */
router.delete('/:albumId/photos/:photoId', album_controller_1.removePhoto);
exports.default = router;
