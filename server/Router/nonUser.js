import { Router } from "express";
import { pool } from "../utils/db.js";

const nonUserRouter = Router();

////////////////// get all menu //////////////////
nonUserRouter.get("/", async (req, res) => {
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

////////////////// get menu by keyword //////////////////
nonUserRouter.get("/search", async (req, res) => {
  const keyword = req.query.keyword;
  // console.log(keyword);

  try {
    const result = await pool.query(
      `SELECT * FROM catalog WHERE catalog ILIKE $1`,
      [`%${keyword}%`]
    );
    return res.json({
      data: result.rows,
    });
  } catch (err) {
    console.error("Error getting menu:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default nonUserRouter;
