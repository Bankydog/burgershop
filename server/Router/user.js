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
////////////////// user get data from carts&cart_items by ID //////////////////
userRouter.get("/carts/:id", protect, async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      `SELECT 
        carts.order_no, 
        carts.state, 
        carts.total_prices, 
        carts.ordered_time, 
        catalog.food_name, 
        cart_items.amount
      FROM carts
      JOIN cart_items ON carts.cart_id = cart_items.cart_id
      JOIN catalog ON cart_items.catalog_id = catalog.catalog_id
      WHERE carts.user_id = $1
      AND carts.state != 'finished'`,
      [userId]
    );

    const groupedData = result.rows.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = {
          order_no: item.order_no,
          ordered_time: item.ordered_time,
          state: item.state,
          total_prices: item.total_prices,
          items: [],
        };
      }
      acc[item.order_no].items.push({
        food_name: item.food_name,
        amount: item.amount,
      });
      return acc;
    }, {});

    const groupedArray = Object.values(groupedData);

    res.status(200).json({
      message: "success",
      data: groupedArray,
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
  const { total_prices, cartItems, comment } = req.body;
  const state = "ordered";

  const todayDate = new Date()
    .toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" })
    .replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/, "$3-$2-$1");

  const ordered_time = new Date()
    .toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })
    .replace(",", "")
    .replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/, "$3-$2-$1");

  try {
    await pool.query("BEGIN");
    let newOrderNo;

    const orderNoResult = await pool.query(
      "SELECT order_no, ordered_time FROM carts ORDER BY cart_id DESC LIMIT 1"
    );

    if (orderNoResult.rows.length === 0) {
      newOrderNo = "001";
    } else {
      const latestOrderDate = new Date(orderNoResult.rows[0].ordered_time)
        .toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" })
        .replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/, "$3-$2-$1");

      if (latestOrderDate !== todayDate) {
        newOrderNo = "001";
      } else {
        const orderNoFromTable = parseInt(orderNoResult.rows[0].order_no, 10);
        if (orderNoFromTable >= 999) {
          newOrderNo = "001";
        } else {
          newOrderNo = (orderNoFromTable + 1).toString().padStart(3, "0");
        }
      }
    }

    const result = await pool.query(
      `INSERT INTO carts (total_prices, state, ordered_time, user_id, comment, order_no)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING cart_id, user_id, comment`,
      [total_prices, state, ordered_time, userId, comment, newOrderNo]
    );

    const cartId = result.rows[0].cart_id;

    for (const entry of cartItems) {
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
