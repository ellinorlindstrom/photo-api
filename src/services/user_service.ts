import prisma from '../prisma'
import { AlbumId } from '../types/Album.types';
import { PhotoId } from '../types/Photo.types';
import { CreateUser, UpdateUser } from '../types/User.types';

/**
 * Get User by email
 *
 * @param email Email of user to get
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}

/**
 * Get a User by id
 *
 * @param id (User id)
 */
export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
		where:{
			id,
		},
	});
}

/**
 * Create a User
 *
 * @param data User data
 */
export const createUser = async (data: CreateUser) => {
	return await prisma.user.create({
		data,
	});
}

/**
 * Update a User
 *
 * @param userId (to update)
 * @param data User data
 * @returns
 */
export const updateUser = async (userId: number, data: UpdateUser)=> {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data,
	})
}

/**
 * Get a User's Photos
 *
 * @param userId (User id)
 */
export const getUserPhotos = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {
			photos: true,
		},
		where: {
			id: userId,
		},
	});
	return user.photos;
}

/**
 * Add Photos to a User
 *
 * @param userId (User id)
 * @param photoIds Photo ID(s) to link
 */

export const addUserPhotos = async (userId: number, photoIds: PhotoId | PhotoId[]) => {
	const user = await prisma.user.update({
		select: {
			photos: true,
		},
		where: {
			id: userId,
		},
		data: {
			photos: {
				connect: photoIds,
			},
		},
	});
	return user.photos;
}

/**
 * Remove Photo from a User
 *
 * @param userId (User id)
 * @param photoId Photo ID to unlink
 */

export const removeUserPhoto = async (userId: number, photoId: number) => {
	const user = await prisma.user.update({
		select: {
			photos: true,
		},
		where: {
			id: userId,
		},
		data: {
			photos: {
				disconnect: {
					id: photoId,
				},
			},
		},
	});
return user.photos;
}

/**
 * Get a User's Albums
 *
 * @param userId (User id)
 */
export const getUserAlbums = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {
			albums: true,
		},
		where: {
			id: userId,
		},
	});
	return user.albums;
}

/**
 * Add Albums to a User
 *
 * @param userId (User id)
 * @param albumIds Album ID(s) to link
 */
export const addUserAlbums = async (userId: number, albumIds: AlbumId | AlbumId[]) => {
	const user = await prisma.user.update({
		select: {
			albums: true,
		},
		where: {
			id: userId,
		},
		data: {
			albums: {
				connect: albumIds,
			},
		},
	});
	return user.albums;
}


/**
 * Remove Album from a User
 *
 * @param userId (User id)
 * @param albumId Photo ID to unlink
 */

export const removeUserAlbum = async (userId: number, albumId: number) => {
	const user = await prisma.user.update({
		select: {
			albums: true,
		},
		where: {
			id: userId,
		},
		data: {
			albums: {
				disconnect: {
					id: albumId,
				},
			},
		},
	});
	return user.albums;
}


/**
 * Remove a User
 *
 * @param userId (User id)
 */
export const removeUser = async (userId: number) => {
	return await prisma.user.delete({
		where: {
			id: userId,
		},
	});
}

