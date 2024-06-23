import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRouter from "./Router/Data.js";
import authRouter from "./Router/auth.js";
import adminRouter from "./Router/admin.js";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", dataRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hellllllllllooooo");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
