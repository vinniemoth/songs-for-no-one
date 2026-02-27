import express from "express";

import dedicationService from "../services/dedicationService.js";
import { dedicationSchema } from "../schemas/dedicationSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const data = req.body;
  const validation = dedicationSchema.safeParse(data);
  if (!validation.success) {
    return res.status(400).json({
      error: "Invalid data.",
      details: validation.error.flatten().fieldErrors,
    });
  }
  try {
    const dedication = await dedicationService.createDedication({
      ...validation.data,
      authorId: req.userId,
    });
    res.status(201).json(dedication);
  } catch (error) {
    res.status(500).json("Error creating dedication");
  }
});

router.get("/", async (req, res) => {
  try {
    const { location, page } = req.query;
    const currentPage = parseInt(page) || 1;

    const dedications = await dedicationService.fetchDedicationByCity(
      location,
      currentPage,
      10,
    );
    res.json(dedications);
  } catch (error) {
    console.error(error);
  }
});

router.get("/most_recent", async (req, res) => {
  try {
    const dedication = await dedicationService.fetchMostRecentDedication();
    res.json(dedication);
  } catch (error) {
    console.error(error);
  }
});
router.get("/featured", async (req, res) => {
  try {
    const dedication = await dedicationService.fetchFeaturedDedication();
    res.json(dedication);
  } catch (error) {
    console.error(error);
  }
});

export default router;
