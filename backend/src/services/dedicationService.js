import prisma from "../../lib/prisma.js";

const dedicationService = {
  async createDedication({ song, dedication, location, authorId }) {
    try {
      const result = await prisma.dedication.create({
        data: {
          songName: song.name,
          artistName: song.artist,
          albumImage: song.album,
          spotifyLink: song.link,
          dedication,
          location,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteDedication(id, userId) {
    try {
      const dedication = await prisma.dedication.findUnique({
        where: { id },
      });

      if (!dedication) {
        return { status: "404", message: "Dedication not found." };
      }
      if (dedication.authorId !== userId) {
        return {
          status: "401",
          message: "You are not authorized to delete this dedication.",
        };
      }

      await prisma.dedication.delete({
        where: { id },
      });

      return { status: "200", message: "Dedication deleted successfully." };
    } catch (error) {
      return error;
    }
  },

  async fetchDedicationByCity(location, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    try {
      const result = await prisma.dedication.findMany({
        where: {
          location: {
            contains: location,
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: skip,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchMostRecentDedication() {
    try {
      const result = await prisma.dedication.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchFeaturedDedication() {
    try {
      const result = await prisma.dedication.groupBy({
        by: ["songName", "artistName", "albumImage", "spotifyLink"],
        _count: {
          songName: true,
        },
        orderBy: {
          _count: {
            songName: "desc",
          },
        },
        take: 1,
      });
      return result[0];
    } catch (error) {
      console.error(error);
    }
  },
};
export default dedicationService;
