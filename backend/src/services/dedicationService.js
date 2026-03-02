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
      return {
        status: 201,
        message: "CREATED",
        data: result,
      };
    } catch (error) {
      console.error("Error creating dedication", error);
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
    }
  },

  async deleteDedication(id, userId) {
    try {
      const dedication = await prisma.dedication.findUnique({
        where: { id },
      });

      if (!dedication) {
        return { status: 404, message: "NOT_FOUND" };
      }

      if (dedication.authorId !== userId) {
        return {
          status: 401,
          message: "UNAUTHORIZED",
        };
      }

      await prisma.dedication.delete({
        where: { id },
      });

      return { status: 200, message: "SUCCESS" };
    } catch (error) {
      console.error("Error deleting dedication", error);
      return {
        status: "500",
        message: "INTERNAL_SERVER_ERROR",
      };
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
      return {
        status: 200,
        message: "SUCCESS",
        data: result,
      };
    } catch (error) {
      console.error("INTERNAL SERVER ERROR", error);
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
    }
  },

  async fetchMostRecentDedication() {
    try {
      const result = await prisma.dedication.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
      return { status: 200, message: "SUCCESS", data: result };
    } catch (error) {
      console.error("INTERNAL SERVER ERROR", error);
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
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
      return { status: 200, message: "SUCCESS", data: result[0] };
    } catch (error) {
      console.error("INTERNAL SERVER ERROR", error);
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
    }
  },
};
export default dedicationService;
