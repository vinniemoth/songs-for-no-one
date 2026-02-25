/*
  Warnings:

  - Added the required column `dedication` to the `dedication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `dedication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dedication" ADD COLUMN     "dedication" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
