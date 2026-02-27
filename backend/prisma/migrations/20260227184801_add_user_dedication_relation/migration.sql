/*
  Warnings:

  - Added the required column `authorId` to the `dedication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dedication" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "dedication" ADD CONSTRAINT "dedication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
