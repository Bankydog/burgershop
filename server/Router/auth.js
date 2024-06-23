import { Router } from "express";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";

const authRouter = Router();

////////////////// register //////////////////
authRouter.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        error: "Please provide username, password.",
      });
    }

    const userFromPool = `SELECT * FROM users WHERE LOWER(username) = LOWER($1)`;
    const result = await pool.query(userFromPool, [username]);

    if (result.rows.length > 0) {
      return res.status(400).json({
        error: "Username is already.",
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

////////////////// login //////////////////
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    ///////////// check input //////////////////
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    ///////////// check username //////////////////
    const checkUser = await pool.query(
      `SELECT user_id, username, role FROM users WHERE username = $1`,
      [username]
    );

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = checkUser.rows[0];

    ///////////// check password //////////////////
    const checkPassword = await pool.query(
      `SELECT username FROM users WHERE  password = crypt($1, password)`,
      [password]
    );

    if (checkPassword.rows.length === 0) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
    ///////////// jwt //////////////////
    console.log("User Role:", user.role);
    console.log("User:", user);

    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    return res.json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default authRouter;
