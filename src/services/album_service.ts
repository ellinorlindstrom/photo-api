/**
 * Album service
 */

import prisma from "../prisma";
import { PhotoId } from "../types/Photo.types";
import { CreateAlbum, UpdateAlbum } from "../types/Album.types";

/**
 * Get all albums
 */
export const getAlbums = async (userId:number) => {
	return await prisma.album.findMany({
		where: {
			userId: userId,
		},
	});
}

/**
 * Get a single Album
 *
 * @param AlbumId
 */
export const getAlbum = async (albumId: number, userId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where:{
			id: albumId,
			userId: userId,
		},
	 	include: {
			photos: true,
		},
	});
}

/**
 * Create a new Album
 *
 * @param data Album data
 */
export const createAlbum = async (data: CreateAlbum, userId: number) => {
	return await prisma.album.create({

		data: {
			...data,
			userId: userId,
		}
	});
}

/**
 * Update an album
 *
 * @param albumId (to update)
 * @param data Album data
 * @returns
 */
export const updateAlbum = async (albumId: number, data: UpdateAlbum, userId: number)=> {
return await prisma.album.update({
	where: {
		id: albumId,
		userId: userId,
	},
	data,
})

}

/**
 * Delete an album
 *
 * @param albumId (to delete)
 */

export const deleteAlbum = async (albumId: number, userId: number) => {
	return await prisma.album.delete({
		where: {
			id: albumId,
			userId: userId,
		},
	})
}

/**
 * Link a photo to album
 *
 * @param albumId (to link)
 * @param photoId (to link)
 */

export const addPhotoToAlbum = async (albumId: number, photoIds: number | number[], userId: number) => {
    //Convert photoIds to an array of objects, if its not already
	const photoIdsArray = Array.isArray(photoIds) ? photoIds : [photoIds];

	//checking if photos belong to user
	const photos = await prisma.photo.findMany({
		where: {
			id: {
				in: photoIdsArray,
			},
			userId: userId,
		},
	});

	// If the number of photos found does not match the number of photoIds, throw an error
	if (photos.length !== photoIdsArray.length) {
		throw new Error('One or more photos do not belong to the user');
	}

	// If all photos belong to the user, connect them to the album
    const connectIds = photos.map((photo) => ({ id: photo.id }));

    return await prisma.album.update({
        where: {
            id: albumId,
            userId: userId,
        },
        data: {
            photos: {
                connect: connectIds,
            },
        },
        include: {
            photos: true,
        },
    });
};

/**
 * Unlink a photo from album
 *
 * @param albumId ID of the album to unlink
 * @param photoId ID of the photo to unlink
 */
export const removePhotoFromAlbum = async (albumId: number, photoId: number, userId: number)=> {

	// check if the photo belongs to the user
	const photo = await prisma.photo.findUnique({
		where: {
			id: photoId,
			userId: userId,
		},
	});

	// if the photo does not belong to the user, throw an error
	if (!photo) {
		throw new Error('Photo does not belong to the user');
	}

	return await prisma.album.update({
		where: {
			id: albumId,
			userId: userId,
		},
		data: {
			photos: {
				disconnect:{
					id: photoId,
				},
			},
		},
		include: {
			photos: true,
		}
	});
}
