/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `album_userId_key` ON `album`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `photo_userId_key` ON `photo`(`userId`);
