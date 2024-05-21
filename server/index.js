import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hellllllllllooooo");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
