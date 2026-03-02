import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const user = await userService.findUserById(req.userId);
  console.log(user);
  res.status(user.status).json({ message: user.message, data: user.data });
});

export default router;
