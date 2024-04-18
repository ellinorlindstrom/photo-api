/**
 * Validation rules for user
 */

import { body } from 'express-validator';
import { getUserByEmail } from '../services/user_service';

export const createUserRules = [
	// name required + trimmed + at least 3 chars
	body('first_name')
		.isString().withMessage('Name must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters'),

	// name required + trimmed + at least 3 chars
	body('last_name')
		.isString().withMessage('Name must be a string').bail()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters'),


	// email required + trimmed + valid email + unique
	body("email")
		.trim().isEmail().withMessage('email has to be a valid email').bail()
		.custom(async (value) => {
			//check if user with same email already exists
			const user = await getUserByEmail(value);

			if (user) {
				//if it exists throw an error
				throw new Error('User with this email already exists');
			}
		}),

	// password required + trimmed + at least 6 chars
	body('password')
		.isString().withMessage('password must be a string').bail()
		.trim().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
	];

export const updateUserRules = [

	body('first_name')
	.optional()
	.trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters')
	.custom(async (value) => {
		// check if a user with the same email already exists
		const user = await getUserByEmail(value);

		if (user) {
			// if it exists throw an error
			throw new Error('User with this email already exists');
		}
	}),

	body('last_name')
		.optional()
		.trim().isLength({ min: 3, max: 191 }).withMessage('Name must be between 3 and 191 characters')
		.custom(async (value) => {
			// check if a user with the same email already exists
			const user = await getUserByEmail(value);

			if (user) {
				// if it exists throw an error
				throw new Error('User with this email already exists');
			}
		}),

		//password required + trimmed + at least 6 chars
	body('password')
		.optional()
		.isString().withMessage('password has to be a string').bail()
		.trim().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),



	// email required + trimmed + valid email + unique
	body("email")
		.optional()
		.trim().isEmail().withMessage('email has to be a valid email').bail()
		.custom(async (value) => {
			//check if user with same email already exists
			const user = await getUserByEmail(value);

			if (user) {
				//if it exists throw an error
				throw new Error('User with this email already exists');
			}
		})

	];

