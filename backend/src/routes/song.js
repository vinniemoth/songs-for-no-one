import express from "express";
import spotifyService from "../services/spotifyService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const token = await spotifyService.getSpotifyToken();
  res.json(token);
});

router.get("/search", async (req, res) => {
  const q = req.query.q;
  const result = await spotifyService.searchTracks(q);

  res.json({ Search: q, result });
});

export default router;
