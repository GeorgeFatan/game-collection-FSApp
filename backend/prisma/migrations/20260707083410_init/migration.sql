-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "rating" TEXT NOT NULL
);
