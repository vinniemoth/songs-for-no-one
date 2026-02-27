import cors from "cors";
import express from "express";
const app = express();
const port = 3000;

import songRoute from "./routes/song.js";
import dedicationsRoute from "./routes/dedications.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

app.use(cors());
app.use(express.json());
app.use("/song", songRoute);
app.use("/dedication", dedicationsRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
