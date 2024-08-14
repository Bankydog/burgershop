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
////////////////// get data from carts //////////////////
userRouter.get("/carts/:id", protect, async (req, res) => {
  const userId = req.params.id;
  try {
    // const result = await pool.query(
    //   `
    //   SELECT carts.user_id, carts.state, carts.ordered_time,
    //    cart_items.catalog_id, cart_items.amount
    //   FROM carts
    //   JOIN cart_items USING (cart_id)
    //   WHERE carts.user_id = $1
    // `,
    //   [userId]
    // );
    const result = await pool.query(`select * from carts where user_id = $1`, [
      userId,
    ]);

    res.status(200).json({
      message: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    return res.status(500).json({
      message: "Error retrieving carts",
    });
  }
});

////////////////// post carts with id by user //////////////////
userRouter.post("/carts/:id", protect, async (req, res) => {
  const userId = req.params.id;
  const ordered_time = new Date()
    .toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })
    .replace(",", "");
  const { total_prices, state, catalog_entries, comment } = req.body;

  try {
    await pool.query("BEGIN");

    const result = await pool.query(
      `INSERT INTO carts (total_prices, state, ordered_time, user_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING user_id, comment`,
      [total_prices, state, ordered_time, userId, comment]
    );

    const cartId = result.rows[0].user_id;

    for (const entry of catalog_entries) {
      const { catalog_id, amount } = entry;

      await pool.query(
        `INSERT INTO cart_items (cart_id, catalog_id, amount)
         VALUES ($1, $2, $3)
         ON CONFLICT (cart_id, catalog_id) 
         DO UPDATE SET amount = EXCLUDED.amount`,
        [cartId, catalog_id, amount]
      );
    }

    await pool.query("COMMIT");
    res.status(201).json({ message: "Cart created successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error executing query", err.stack);
    res.status(500).json({ message: "Error creating cart" });
  }
});

export default userRouter;
