import express from "express";

import { userSchema } from "../schemas/userSchema.js";
import userService from "../services/userService.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const data = req.body;
  const validation = userSchema.safeParse(data);

  if (!validation.success) {
    res.status(400).json({
      error: "Invalid data.",
      details: validation.error.flatten().fieldErrors,
    });
  }
  try {
    const user = await userService.createUser(validation.data);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userService.login({ email, password });
    if (!data) {
      return res.status(401).json("Invalid credentials");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Error fetching user");
  }
});

export default router;
