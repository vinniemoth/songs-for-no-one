import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userService = {
  async createUser({ username, email, password }) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      const { password: _, ...userWithoutPassword } = result;

      return { status: 201, message: "SUCCESS", data: userWithoutPassword };
    } catch (error) {
      if (error.code === "P2002") {
        return {
          status: 400,
          message: "EXISTING_USER",
        };
      }
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
    }
  },

  async login({ email, password }) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return {
          status: 404,
          message: "NOT_FOUND",
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        return {
          status: 200,
          message: "SUCCESS",
          token,
        };
      }
      return {
        status: 404,
        message: "NOT_FOUND",
      };
    } catch (error) {
      console.error("INTERNAL SERVER ERROR:", error);
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
    }
  },

  async findUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          email: true,
          username: true,
          dedications: true,
        },
      });

      return {
        status: 200,
        message: "SUCCESS",
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      };
    }
  },
};

export default userService;
