import express from "express";

import { userSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const data = req.body;
  const validation = userSchema.safeParse(data);

  if (!validation.success) {
    return res.status(400).json({
      error: "Invalid data.",
      details: validation.error.flatten().fieldErrors,
    });
  }
  try {
    const user = await userService.createUser(validation.data);
    console.log(user);
    return res
      .status(user.status)
      .json({ message: user.message, data: user.data });
  } catch (error) {
    return res.status(500).json({ message: "FATAL_ERROR" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userService.login({ email, password });
    if (!data) {
      return res.status(401).json("Invalid credentials");
    }
    return res
      .status(data.status)
      .json({ message: data.message, token: data.token });
  } catch (error) {
    return res.status(500).json({ message: "FATAL ERROR" });
  }
});

export default router;
