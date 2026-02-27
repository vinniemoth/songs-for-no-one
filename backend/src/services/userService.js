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

      return result;
    } catch (error) {
      if (error.code === "P2002") {
        throw new Error("Email already exists");
      }
      throw new Error("Error creating user");
    }
  },

  async login({ email, password }) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        console.log("User not found");
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        return {
          token,
        };
      }
      return null;
    } catch (error) {
      console.error(error);
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

      return user;
    } catch (error) {
      return null;
    }
  },
};

export default userService;
