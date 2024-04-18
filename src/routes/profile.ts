import express from 'express';
import { addPhotos, getPhotos, getProfile, removePhoto, updateProfile } from '../controllers/profile_controller';
import validateRequest from '../middlewares/validate_request';
import { updateUserRules } from '../validations/user_rules';
import { addAlbums, removeAlbum, getAlbums } from '../controllers/profile_controller';
const router = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
router.get('/', getProfile);

/**
 * UPDATE /profile
 *
 * Update the authenticated user's profile
 */
router.patch('/', updateUserRules, validateRequest, updateProfile);

/**
 * GET /profile/photos
 *
 * Get all photos for the authenticated user
 */
router.get('/photos', getPhotos);

/**
 * GET /profile/albums
 *
 * Get all albums for the authenticated user
 */
router.get('/albums', getAlbums);

/**
 * POST /profile/photos
 *
 * Add photos to the authenticated user's profile
 */
router.post('/photos', addPhotos);

/**
 * POST /profile/albums
 *
 * Add albums to the authenticated user's profile
 */
router.post('/albums', addAlbums);

/**
 * DELETE /profile/photos/:photoId
 *
 * Remove a photo from the authenticated user's profile
 */
router.delete('/photos/:photoId', removePhoto);

/**
 * DELETE /profile/albums/:albumId
 *
 * Remove an album from the authenticated user's profile
 */
router.delete('/albums/:albumId', removeAlbum);

export default router;
