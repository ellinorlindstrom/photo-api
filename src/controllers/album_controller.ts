/**
 * Album Controller
 */

import Debug from 'debug';
import { Request, Response } from 'express';
import { addPhotoToAlbum, createAlbum, deleteAlbum,getAlbum, getAlbums,removePhotoFromAlbum, updateAlbum } from '../services/album_service';
import { matchedData } from 'express-validator';
import { CreateAlbum, UpdateAlbum } from '../types/Album.types';

// Create a new debug instance
const debug = Debug('prisma-boilerplate:AlbumController');

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {
  	if (!req.token) {
		return res.status(401).send('No authenticated user found');
  	}
	  	const userId = req.token.sub;
	try {
		const albums = await getAlbums(userId);
		res.send({ status: 'success', data: albums });

  	} catch (error) {
		debug('Error when trying to query for all Albums: %O',error);
		res.status(500).json({ status: 'error', message: 'Something went wrong when querying the database!! 🐰' });
  	}
  }

/**
 * Get a single Album
 */

export const show = async (req: Request, res: Response) => {
	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}

	const albumId = Number(req.params.albumId);
	const userId = req.token.sub;

	try {
		const album = await getAlbum(albumId, userId);
		if (album) {
			// Omitting userId from the album object
			const { userId, ...albumData } = album;

			res.send({ status: 'success', data: albumData });
		}
	} catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Album not found' });
		} else {
			debug('Error when trying to query for Album with ID %d: %O',albumId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🐸' });
		}
	}
}

/**
 * Create a new Album
 */
export const store = async (req: Request, res: Response) => {

	if (!req.token || typeof req.token.sub === 'undefined') {
		return res.status(401).send('No authenticated user found');
	}
	// Get only validated data
	const validData = matchedData(req) as CreateAlbum;
	const userId = req.token.sub;

	try {
		const albums = await createAlbum(validData, userId);
		res.status(201).send({ status: 'success', data: albums });

	} catch (error: any) {
		console.error("Detailed error: ", error)
		debug('Error when trying to create Album: %O', error);
		res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🦉' });
	}

}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {

	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}

	const albumId = Number(req.params.albumId);
	const validData = matchedData(req) as UpdateAlbum;
	const userId = req.token.sub;

	try {
		const album = await updateAlbum(albumId, validData, userId);
		res.status(200).send({ status: 'success', data: album });

	} catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Album not found' });
		} else {
			debug('Error when trying to update Album with ID %d: %O', albumId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🐽' });
		}
	}
}

/**
 * Delete an album
 */

export const destroy = async (req: Request, res: Response) => {

	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}
	const albumId = Number(req.params.albumId);
	const userId = req.token.sub;

	try {
		await deleteAlbum(albumId, userId);
		res.status(200).send({ status: 'success', data: {} });

	} catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Album not found' });
		} else {
			debug('Error when trying to delete Album with ID %d: %O', albumId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database... 🐼' });
		}
	}
}

/**
 * Add Photos to an Album
 */
export const addPhotos = async (req: Request, res: Response) => {
	if (!req.token) {
		return res.status(401).send({status: 'error', message: 'No authenticated user found'});
	}

	const albumId = Number(req.params.albumId);
	const photoIdsInput = Array.isArray(req.body) ? req.body : [req.body];
	const photoIds = photoIdsInput.map(item => item.id);
	const userId = req.token.sub;

	try {
		await addPhotoToAlbum(albumId, photoIds, userId);
		res.status(201).send({ status: 'success', data: null });

	} catch (error: any) {
		console.error('Error when trying to add Photos to Album: ', error);
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Album or Photo not found' });
		} else {
			debug('Error when trying to add Photos to Album with ID %d: %O', albumId, photoIds, error);
			res.status(401).send({ status: 'error', message: 'Unauthorized access or action' });
		}
	}
}

/**
 * Remove Photo from an Album
 */
export const removePhoto = async (req: Request, res: Response) => {
	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}
	const albumId = Number(req.params.albumId);
	const photoId = Number(req.params.photoId);
	const userId = req.token.sub;

	try {
		const album = await removePhotoFromAlbum(albumId, photoId, userId);
		res.status(200).send({ status: 'success', data: album });

	} catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Album or Photo not found' });
		} else {
			debug('Error when trying to remove Photo from Album with ID %d: %O', albumId, photoId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database..🐨' });
		}
	}
}
