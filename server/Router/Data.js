import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";

const dataRouter = Router();

dataRouter.use(protect);

dataRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return res.json({
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error retrieving data",
    });
  }
});

export default dataRouter;
