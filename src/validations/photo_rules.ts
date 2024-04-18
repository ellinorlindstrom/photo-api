/**
 * Validation rules for photo resource
 */

import { body } from 'express-validator';

export const createPhotoRules = [
	// title required + trimmed + at least 3 chars
	body('title')
		.isString().withMessage('Title must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),

	// url required + trimmed + valid url
	body("url")
		.trim().isURL().withMessage('url has to be a valid url'),

	body('userId')
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('userId must be a number'),

	body('comment')
		.optional()
		.isString().withMessage('Comment must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Comment must be between 3 and 191 characters'),


];

export const updatePhotoRules = [
	body('title')
		.optional()
		.isString().withMessage('Title must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Title must be between 3 and 191 characters'),

	body('url')
		.optional()
		.trim().isURL().withMessage('url has to be a valid url'),

	body('userId')
        .optional({ checkFalsy: true })
        .isNumeric().withMessage('userId must be a number'),

	body('comment')
		.optional()
		.isString().withMessage('Comment must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Comment must be between 3 and 191 characters'),

];

