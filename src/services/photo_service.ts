/**
 * Photo service
 */

import prisma from "../prisma";
import { CreatePhoto, UpdatePhoto } from "../types/Photo.types";

/**
 * Get all photos
 */
export const getPhotos = async (userId: number) => {
	return await prisma.photo.findMany({
		where: {
			userId: userId,
		},

	});

}

/**
 * Get a single Photo
 *
 * @param PhotoId
 */
export const getPhoto = async (photoId: number, userId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where:{
			id: photoId,
			userId: userId,
		},
	});
}

/**
 * Create a new Photo
 *
 * @param data Photo data
 */
export const createPhoto = async (data: CreatePhoto, userId: number) => {
	return await prisma.photo.create({
		data: {
			...data,
			userId: userId,
		},
	});
}

/**
 * Update a photo
 *
 * @param photoId (to update)
 *
 */
export const updatePhoto = async (photoId: number, data: UpdatePhoto, userId: number)=> {
return await prisma.photo.update({
	where: {
		id: photoId,
		userId: userId,
	},
	data,
})

}

/**
 * Delete a photo
 *
 * @param photoId (to delete)
 */

export const deletePhoto = async (photoId: number, userId: number) => {
	return await prisma.photo.delete({
		where: {
			id: photoId,
			userId: userId,
		},
	})
}
