import z from "zod";

export const userSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 6 characters long."),
});
