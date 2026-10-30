-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "hoursPlayed" INTEGER DEFAULT 0,
ADD COLUMN     "lastPlayed" TIMESTAMP(3);
