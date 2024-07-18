import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nonUserRouter from "./Router/nonUser.js";
import userRouter from "./Router/user.js";
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

app.use("/", nonUserRouter);
app.use("/posts", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// app.get("/", (req, res) => {
//   res.send("Hellllllllllooooo");
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
