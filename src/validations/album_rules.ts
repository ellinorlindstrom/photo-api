/**
 * Validation rules for photo resource
 */

import { body } from 'express-validator';

export const createAlbumRules = [
	// title required + trimmed + at least 3 chars
	body('title')
		.isString().withMessage('Title must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),

];

export const updateAlbumRules = [
	body('title')
		.optional()
		.isString().withMessage('Title must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),


];

