-- CreateTable
CREATE TABLE "dedication" (
    "id" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "albumImage" TEXT NOT NULL,
    "spotifyLink" TEXT NOT NULL,

    CONSTRAINT "dedication_pkey" PRIMARY KEY ("id")
);
