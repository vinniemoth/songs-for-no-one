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
    res
      .status(dedication.status)
      .json({ message: dedication.message, data: dedication.data });
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
    res
      .status(dedications.status)
      .json({ message: dedications.message, data: dedications.data });
  } catch (error) {
    console.error("FATAL ERROR", error);
    return res.status(500).json({ message: "FATAL_ERROR" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const dedication = await dedicationService.deleteDedication(id, userId);

    res.status(dedication.status).json({
      message: dedication.message,
    });
  } catch (error) {
    console.error("FATAL ERROR:", error);
    res.status(500).json({ message: "FATAL_ERROR" });
  }
});

router.get("/most_recent", async (req, res) => {
  try {
    const dedication = await dedicationService.fetchMostRecentDedication();
    res
      .status(dedication.status)
      .json({ message: dedication.message, data: dedication.data });
  } catch (error) {
    console.error("FATAL_ERROR", error);
    return res.status(500).json({ message: "FATAL_ERROR" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const dedication = await dedicationService.fetchFeaturedDedication();
    res.status(dedication.status).json({
      message: dedication.message,
      data: dedication.data,
    });
  } catch (error) {
    console.error("FATAL ERROR", error);
    return res.status(500).json({ message: "FATAL_ERROR" });
  }
});

export default router;
