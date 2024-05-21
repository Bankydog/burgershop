import { Router } from "express";
import { pool } from "../utils/db.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        error: "Please provide username, password.",
      });
    }

    const created_at = new Date().toISOString();

    await pool.query(
      `INSERT INTO users (username, password, role, created_at)
       VALUES ($1, crypt($2, gen_salt('bf')), $3, $4)`,
      [username, password, role, created_at]
    );

    return res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default authRouter;
