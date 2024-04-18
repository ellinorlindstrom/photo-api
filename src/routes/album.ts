import express from 'express';
import { addPhotos, destroy, index, removePhoto, show, store, update } from '../controllers/album_controller';
import validateRequest from '../middlewares/validate_request';
import { createAlbumRules, updateAlbumRules } from '../validations/album_rules';
const router = express.Router();

/**
 * GET /albums
 *
 * Get all albums
 */
router.get('/', index);

/**
 * GET /albums/:albumId
 *
 * Get a single album
 */
router.get('/:albumId', show);

/**
 * POST /albums
 *
 * Create a new album
 */
router.post('/', createAlbumRules, validateRequest, store);

/**
 * PATCH /albums/:albumId
 *
 * Update an album
 */
router.patch('/:albumId', updateAlbumRules, validateRequest, update);

/**
 * DELETE /albums/:albumId
 *
 * Delete an album
 */
router.delete('/:albumId', destroy);

/**
 * POST /albums/:albumId/photos
 *
 * Add photos to an album
 */
router.post('/:albumId/photos', addPhotos);

/**
 * DELETE /albums/:albumId/photos/:photoId
 *
 * Remove a photo from an album
 */
router.delete('/:albumId/photos/:photoId', removePhoto);

export default router;
