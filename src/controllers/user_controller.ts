/**
 * Register Controller
 */

import bcrypt from 'bcrypt';
import Debug from 'debug';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, getUserById } from '../services/user_service';
import { CreateUser } from '../types/User.types';
import { JwtPayload, JwtRefreshPayload } from '../types/Token.types';
import { extractAndValidateAuthHeader } from '../helpers/auth_helper';

// Create a new debug instance
const debug = Debug('prisma-boilerplate:AlbumController');

interface LoginRequestBody {
	email: string;
	password: string;
}

/**
 * Log in a User
 */
export const login = async (req: Request, res: Response) => {
	// get (destruct) email and password from request body
	const { email, password } = req.body as LoginRequestBody;

	// find user with email, otherwise bail 👮🏼
	const user = await getUserByEmail(email);
	if (!user) {
		debug('User with email %s not found', email);
		return res.status(401).send({ status: 'fail', message: 'Authorization required 👀' });

	}

	//verify credentials against hash, otherwise bail 👮🏼
	const result = await bcrypt.compare(password, user.password);
	if (!result) {
		debug('User %s is incorrect', email);
		return res.status(401).send({ status: 'fail', message: 'Authorization required🐨' });
	}

	// create JWT-payload
	const payload: JwtPayload = {
		sub: user.id,
		name: user.first_name && user.last_name,
		email: user.email,
	}

	// sign payload with access token secret and get token
	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug('ACCESS_TOKEN_SECRET missing in environment');
		return res.status(500).send({ status: 'error', message: 'No access token secret defined' });
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h'
	});

	// create jwt refresh token payload
	const refreshPayload: JwtRefreshPayload = {
		sub: user.id,
	}

	// sign payload with refresh token secret and get refresh-token
	if (!process.env.REFRESH_TOKEN_SECRET) {
		debug('REFRESH_TOKEN_SECRET missing in environment');
		return res.status(500).send({ status: 'error', message: 'No refresh token secret defined'});
	}
	const refresh_token = jwt.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1d',
	});

	// respond with acces-token
	res.send({
		status: 'success',
		data: {
			access_token,
			refresh_token,
		},
	});
}

/**
 * Refresh access token
 *
 * Receive a refresh token and return a new access token
 *
 * Authorization: Bearer <refresh-token>
 */

export const refresh = async (req: Request, res: Response) => {
	let token: string;

	// extract and validate refresh token from request
	try {
		token = extractAndValidateAuthHeader(req, 'Bearer');
	} catch (error) {
		if (error instanceof Error) {
			return res.status(401).send({ status: 'fail', message: error.message });
		}
		return res.status(401).send({ status: 'fail', message: 'Unknown authorization error' });
	}

	// verify refresh token and extract refresh-payload otherwise bail 👮🏼
	if (!process.env.REFRESH_TOKEN_SECRET) {
		debug('REFRESH_TOKEN_SECRET missing in environment');
		return res.status(500).send({ status: 'error', message: 'No refresh token secret defined' });
}
try {
	//Verify token
	const refreshPayload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as unknown as JwtRefreshPayload;
	debug('Refresh payload %O', refreshPayload);

	// find user from database by id
	const user = await getUserById(refreshPayload.sub);
	if (!user) {
		debug('User not found🕵️‍♀️');
		return res.status(500).send({ status: 'fail', message: 'Access denied' });
	}

	// create new access token payload
	const payload: JwtPayload = {
		sub: user.id,
		name: user.first_name && user.last_name,
		email: user.email,
	}

	//issue new access token
	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug('ACCESS_TOKEN_SECRET missing in environment');
		return res.status(500).send({ status: 'error', message: 'No access token secret defined' });
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h',
	});

	// respond with new access token
	res.send({
		status: 'success',
		data: {
			access_token,
		},
	});

	} catch (error) {
		debug('JWT Verify failed: %O', error);
		return res.status(401).send({ status: 'fail', message: 'Authorization required' });
	}

}

/**
 * Register a User
 */
export const register = async (req: Request, res: Response) => {
	//Get only the validated data from the request
	const validData = matchedData(req)
	debug('Validated data %O', validData);

	// Calculate a hash + salt for the password
	const hashedPassword = await bcrypt.hash(validData.password, Number(process.env.SALT_ROUNDS) || 10);
	debug('Password hashed successfully.');

	const data = {
		...validData,
		password: hashedPassword,
	} as CreateUser;

	// Store the user in the database
	try {
		const user = await createUser(data);

		const { password,id, ...userData } = user;

		res.status(201).send({ status: 'success', data: userData });
	} catch (error) {
		debug('Error when trying to create User: %O', error);
		return res.status(500).send({ status: 'error', message: 'Could not create user in database' });
	}
}
