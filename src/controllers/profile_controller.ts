/**
 * Profile Controller
 */

import bcrypt from 'bcrypt';
import Debug from 'debug';
import { Request, Response } from 'express';
import { addUserAlbums, getUserAlbums, removeUserAlbum } from '../services/user_service';
import { addUserPhotos, getUserPhotos, getUserById, removeUserPhoto, updateUser } from '../services/user_service';
import { matchedData } from 'express-validator';
import { UpdateUser } from '../types/User.types';

const debug = Debug('prisma-boilerplate:ProfileController');

/**
 * Get the authenticated users profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// if someone removes the token from the request, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	// get current user profile
	const user = await getUserById(req.token.sub);

	if (user) {
        // Destructure the password out of the response, and capturing the rest of the properties in `userData`
        const { password, ...userData } = user;

        // Responding with 200 Ok + status success, excluding the password
        res.status(200).send({ status: 'success', data: userData });
    } else {
        // Handle the case where createUser returned null
        res.status(404).send({ status: 'error', message: 'User not created' });
    }
}
/**
 * Update the authenticated users profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	// if someone removes the token from the request, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	// Get only validated data
	const validData = matchedData(req) as UpdateUser;

	//if user wants to update password, hash it and salt it 🥨
	if (validData.password) {
		validData.password = await bcrypt.hash(validData.password, Number(process.env.SALT_ROUNDS) || 10);
	}

	try {
		const user = await updateUser(req.token.sub, validData);
		const { password, ...userData } = user;
		res.status(200).send({ status: 'success', data: userData });

	} catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'User not found' });
		} else {
			debug('Error when trying to update User with ID %d: %O', req.token.sub, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database' });
		}

	}
}

/**
 * Get the authenticated users photos
 */
export const getPhotos = async (req: Request, res: Response) => {
	// if someone removes the token from the request, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	const userId = req.token.sub;

	try {
		const photos = await getUserPhotos(userId);
		res.send({
			status: 'success',
			data: photos
		});
	} catch (error: any) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when querying the database'
		});
	}

}

/**
 * Add Photos to the authenticated User
 */
export const addPhotos = async (req: Request, res: Response) => {
	// if someone removes the authentication for the route, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	const userId = req.token.sub;
	const photoIds = req.body.photoIds;

	try {
		const photos = await addUserPhotos(userId, photoIds);
		res.send({
			status: 'success',
			data: photos
		});
	} catch (error: any) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when querying the database'
		});
	}
}

/**
 * Remove a Photo from the authenticated User
 */

export const removePhoto = async (req: Request, res: Response) => {
	// if someone removes authentication from the route, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	const userId = req.token.sub;
	const photoId = Number(req.params.photoId);

	try {
		const photos = await removeUserPhoto(userId, photoId);
		res.send({
			status: 'success',
			data: photos
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when querying the database'
		});
	}
}

/**
 * Get the authenticated users albums
 */
export const getAlbums = async (req: Request, res: Response) => {
	// if someone removes the token from the request, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	const userId = req.token.sub;

	try {
		const albums = await getUserAlbums(userId);
		res.send({
			status: 'success',
			data: albums
		});
	} catch (error: any) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when querying the database'
		});
	}
}

/**
 * Add Albums to the authenticated User
 */
export const addAlbums = async (req: Request, res: Response) => {
	// if someone removes the authentication for the route, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	const userId = req.token.sub;
	const albumIds = req.body.albumIds;

	try {
		const albums = await addUserAlbums(userId, albumIds);
		res.send({
			status: 'success',
			data: albums
		});
	} catch (error: any) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when querying the database'
		});
	}
}

/**
 * Remove the authenticated user's album
 */

 export const removeAlbum = async (req: Request, res: Response) => {
	// if someone removes authentication from the route, throw an error
	if (!req.token) {
		throw new Error ('No authenticated user found')
	}

	const userId = req.token.sub;
	const albumId = Number(req.params.albumId);

	try {
		const albums = await removeUserAlbum(userId, albumId);
		res.send({
			status: 'success',
			data: albums
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Something went wrong when querying the database'
		});
	}
}
