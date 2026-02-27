import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const user = await userService.findUserById(req.userId);
  res.status(200).json(user);
});

export default router;
