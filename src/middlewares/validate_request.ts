/**
 *  Validate Request Middleware
 */
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Validate request
 */
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	const validationErrors = validationResult(req);
	//if validation errors exists, respond with errors and stop request 🫸🏼
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: 'fail',
			data: validationErrors.array(),
		 });
		 return;
	}

	//if no validation errors, continue with next middleware 🏃🏽
	next();
}

export default validateRequest;
