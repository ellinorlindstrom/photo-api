/**
 * Validation rules for authentication
 */

import { body } from 'express-validator';

export const loginRules = [
	body('email')
	.trim().isEmail().withMessage('email has to be a valid email'),

	body('password')
		.isString().withMessage('password has to be a string').bail()
		.trim().notEmpty().withMessage('password is required'),
]
