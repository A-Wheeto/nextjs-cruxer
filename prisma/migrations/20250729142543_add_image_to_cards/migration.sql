/*
  Warnings:

  - Added the required column `image` to the `HomePageCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HomePageCard" ADD COLUMN     "image" TEXT NOT NULL;
