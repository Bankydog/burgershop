import { Router } from "express";
import { pool } from "../utils/db.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const created_at = new Intl.DateTimeFormat("en-GB").format(new Date());

    const signUp = await pool.query(
      `INSERT INTO users (username, password, role, created_at)
         VALUES ($1, crypt($2, gen_salt('bf')), $3, $4) `,
      [username, password, role, created_at]
    );
    return res.json({
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default authRouter;
