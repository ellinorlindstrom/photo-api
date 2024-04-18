/**
 * JWT Authentication Middleware
 */

import Debug from 'debug';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../types/Token.types';
import { extractAndValidateAuthHeader } from '../../helpers/auth_helper';

const debug = Debug('prisma-boilerplate:jwt');

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	debug ('Validating access token 🤞')

	let token: string;
	try {
		token = extractAndValidateAuthHeader(req, 'Bearer');
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).send({ status: 'fail', message: 'Token has expired' });
		} else if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).send({ status: 'fail', message: 'Token is invalid' });
		} else if (error instanceof Error) {
			return res.status(401).send({ status: 'fail', message:  error.message,  });
		} else {
			return res.status(401).send({ status: 'fail', message: 'Unknown authorization error' });
		}
	}


	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug('ACCESS_TOKEN_SECRET missing in environment');
		return res.status(500).send({ status: 'error', message: 'No access token secret defined'});

	}

	try {
		//Verify token
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as unknown as JwtPayload;

		//Attach payload to request
		req.token = payload;
	} catch (error) {
		debug('JWT Verify failed: %O', error);
		return res.status(401).send({ status: 'fail', message: 'Authorization required'})
	}
	next();
 }
