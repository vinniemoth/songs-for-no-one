import z from "zod";

export const dedicationSchema = z.object({
  song: z.object({
    name: z.string().min(1, "Song name is required."),
    artist: z.string().min(1, "Artist name is required."),
    album: z.url("Spotify image must be a valid URL"),
    link: z.url("Spotify link must be a valid URL"),
  }),
  dedication: z.string().min(1, "Dedication is required."),
  location: z.string().min(1, "Location is required."),
});
