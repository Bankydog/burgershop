import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRouter from "./Router/Data.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", dataRouter);

app.get("/", (req, res) => {
  res.send("Hellllllllllooooo");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
