/**
 * Photo Controller
 */

import Debug from 'debug';
import { Request, Response } from 'express';
import { createPhoto, deletePhoto,getPhoto, getPhotos, updatePhoto } from '../services/photo_service';
import { matchedData } from 'express-validator';
import { CreatePhoto, UpdatePhoto } from '../types/Photo.types';

// Create a new debug instance
const debug = Debug('prisma-boilerplate:PhotoController');

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {
	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}
	const userId = req.token.sub;
	try {
        const photos = await getPhotos(userId);
        if (photos) {
            // Omitting userId from each photo object in the array
            const photosData = photos.map(photo => {
                const { userId, ...photoData } = photo;
                return photoData; // Returning the modified object without userId
            });

            // Sending back the response without the userId in each photo object
            res.send({ status: 'success', data: photosData });
        }

  	} catch (error) {
		debug('Error when trying to query for all Photos: %O',error);
		res.status(500).json({ status: 'error', message: 'Something went wrong when querying the database🐉' });
  	}
  }

/**
 * Get a single Photo
 */

export const show = async (req: Request, res: Response) => {

	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}
	const photoId = Number(req.params.photoId);
	const userId = req.token.sub;

	try {
		const photo = await getPhoto(photoId, userId);
	    if (photo) {
			// Omitting userId from the photo object
			const { userId, ...photoData } = photo;

			// Sending back the response without the userId
			res.send({ status: 'success', data: photoData });
		}
	}  catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Photo not found' });
		} else {
			debug('Error when trying to query for Photo with ID %d: %O',photoId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database🐰' });
		}
	}
}

/**
 * Create a new Photo
 */
export const store = async (req: Request, res: Response) => {

	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}
	// Get only validated data
	const validData = matchedData(req) as CreatePhoto;
	const userId = req.token.sub;

	try {
		const photo = await createPhoto(validData, userId);
		res.status(201).send({ status: 'success', data: photo });

	} catch (error: unknown) {
		console.error("Detailed error: ", error);
		debug('Error when trying to create Photo: %O', error);
		res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database🐣' });
	}

}

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {

	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}

	const validData = matchedData(req) as UpdatePhoto;
	const photoId = Number(req.params.photoId);
	const userId = req.token.sub;


	try {
		const photo = await updatePhoto(photoId, validData, userId);
		res.status(200).send({ status: 'success', data: photo });

	} catch (error: any) {
		if ( error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Photo not found' });
		} else {
			debug('Error when trying to update Photo with ID %d: %O', photoId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database🐼 ' });
		}
	}
}

/**
 * Delete a photo
 */

export const destroy = async (req: Request, res: Response) => {

	if (!req.token) {
		return res.status(401).send('No authenticated user found');
	}
	const photoId = Number(req.params.photoId);
	const userId = req.token.sub;

	try {
		await deletePhoto(photoId, userId);
		res.status(200).send({ status: 'success', data: {} });

	} catch (error: any) {
		if (error.code === 'P2025') {
			res.status(404).send({ status: 'error', message: 'Photo not found' });
		} else {
			debug('Error when trying to delete Photo with ID %d: %O', photoId, error);
			res.status(500).send({ status: 'error', message: 'Something went wrong when querying the database 🐸' });
		}
	}
}





