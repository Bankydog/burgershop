import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";

const dataRouter = Router();

dataRouter.use(protect);

dataRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM catalog");
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

dataRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query("select * from users where user_id=$1", [
      userId,
    ]);
    return res.json({
      data: result.rows[0].role,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error retrieving data",
    });
  }
});

export default dataRouter;
