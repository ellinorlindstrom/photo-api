/**
 * Authentication helpers
 */

import Debug from 'debug';
import { Request } from 'express';

const debug = Debug('prisma-photos:auth_helper');

type AuthType = 'Basic' | 'Bearer';

export const extractAndValidateAuthHeader = (req: Request, expectedType: AuthType) => {
	if (!req.headers.authorization) {
		debug('Authorization header missing');
		throw new Error('Authorization header missing');
	}

	const [authSchema, payload] = req.headers.authorization?.split(" ");

	if (authSchema !== expectedType) {
		debug("Authorization schema isn't of expected type %s", expectedType);
		throw new Error(`Expected ${expectedType} authentication`);
	}

	return payload
}
