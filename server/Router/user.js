import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";

const userRouter = Router();

userRouter.use(protect);

////////////////// get all menu //////////////////
userRouter.get("/", protect, async (req, res) => {
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

////////////////// get by id //////////////////
userRouter.get("/profile/:id", protect, async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      `SELECT Users.username, Profile.name, Profile.lastname, Profile.address, Profile.telephone, Profile.email
       FROM Profile
       JOIN Users USING (user_id)
       WHERE user_id = $1
       `,
      [userId]
    );

    if (result.rows.length > 0) {
      return res.json(result.rows[0]);
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error retrieving data",
    });
  }
});

////////////////// post profile by id //////////////////
userRouter.post("/profile/:id", protect, async (req, res) => {
  const userId = req.params.id;
  const { name, lastname, address, telephone, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO profile (user_id, name, lastname, address, telephone, email)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, name, lastname, address, telephone, email]
    );

    res.status(201).json({
      message: "Profile created successfully",
      profile: result.rows[0],
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).json({
      message: "Error creating user profile",
    });
  }
});

////////////////// put profile by id //////////////////
userRouter.put("/profile/:id", protect, async (req, res) => {
  const userId = req.params.id;
  const { name, lastname, address, telephone, email } = req.body;

  try {
    const result = await pool.query(
      `UPDATE profile
       SET name = $1, lastname = $2, address = $3, telephone = $4, email = $5
       WHERE user_id = $6
       RETURNING *`,
      [name, lastname, address, telephone, email, userId]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "Profile updated successfully",
        profile: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).json({
      message: "Error updating user profile",
    });
  }
});

export default userRouter;
