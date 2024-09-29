import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";

const adminRouter = Router();
const upload = multer({ dest: "uploads/" });
const formatDate = () => {
  return new Date()
    .toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })
    .replace(",", "")
    .replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/, "$3-$2-$1");
};

////////////////// post menu //////////////////

adminRouter.post(
  "/addmenu",
  protect,
  checkAdmin,
  upload.single("picture"),
  async (req, res) => {
    try {
      const { name, catalog, price, description } = req.body;

      // // Log file data
      // console.log("Received file:", req.file);

      const imageResult = await cloudinaryUpload(req.file);

      // // Log Cloudinary
      // console.log("Cloudinary result:", imageResult);

      await pool.query(
        `INSERT INTO catalog (food_name, price, catalog, description, image_url) VALUES ($1, $2, $3, $4, $5)`,
        [name, price, catalog, description, imageResult.url]
      );

      return res.status(201).json({
        message: "Menu added successfully",
      });
    } catch (err) {
      console.error("Error adding menu:", err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
);

////////////////// get all menu //////////////////

adminRouter.get("/", protect, checkAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT catalog_id, food_name, price, catalog, description, image_url
      FROM catalog
      ORDER BY 
        CASE 
          WHEN catalog = 'promotion' THEN 1
          WHEN catalog = 'burger' THEN 2
          WHEN catalog = 'frychicken' THEN 3
          WHEN catalog = 'snacks' THEN 4
          WHEN catalog = 'beverage' THEN 5
          ELSE 6
        END;
    `);

    const groupedData = result.rows.reduce((acc, item) => {
      if (!acc[item.catalog]) {
        acc[item.catalog] = [];
      }
      acc[item.catalog].push(item);
      return acc;
    }, {});

    const convertDataToArray = Object.values(groupedData);

    return res.json({
      data: convertDataToArray,
    });
  } catch (error) {
    console.error("Error getting menu:", error);
    return res.status(500).json({
      error: "Internal Server Error naja",
    });
  }
});

////////////////// get menu by keyword //////////////////

adminRouter.get("/search", protect, checkAdmin, async (req, res) => {
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

////////////////// get order for cookker //////////////////
adminRouter.get("/cooking", protect, checkAdmin, async (req, res) => {
  const { state, page, order_no } = req.query;
  const limit = 12;
  const offset = (page - 1) * limit;

  try {
    const states = state ? state.split(",") : ["ordered", "cooking"];

    let orderNoCondition = "";
    const queryParams = [states, limit, offset];

    if (order_no) {
      orderNoCondition = `AND ca.order_no = $4`;
      queryParams.push(order_no);
    }

    const result = await pool.query(
      `SELECT DISTINCT ON (ca.order_no) 
        ca.order_no, 
        ca.ordered_time, 
        ca.state, 
        ca.total_prices, 
        ca.comment
      FROM 
        carts ca
      WHERE
        ca.state = ANY($1)
        ${orderNoCondition}
      ORDER BY ca.order_no
      LIMIT $2 OFFSET $3;`,
      queryParams
    );

    const orderNos = result.rows.map((order) => order.order_no);

    const itemsResult = await pool.query(
      `SELECT 
        ca.order_no, 
        c.food_name, 
        ci.amount
      FROM 
        carts ca
      JOIN 
        cart_items ci ON ca.cart_id = ci.cart_id
      JOIN 
        catalog c ON ci.catalog_id = c.catalog_id
      WHERE
        ca.order_no = ANY($1);`,
      [orderNos]
    );

    const itemsGrouped = itemsResult.rows.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = [];
      }
      acc[item.order_no].push({
        food_name: item.food_name,
        amount: item.amount,
      });
      return acc;
    }, {});

    const groupedArray = result.rows.map((order) => ({
      ...order,
      items: itemsGrouped[order.order_no] || [],
    }));

    res.status(200).json({
      message: "success",
      data: groupedArray,
      page: Number(page),
      limit: limit,
    });
  } catch (err) {
    console.error("Error getting data:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// put ordered by start_cook_time //////////////////
adminRouter.put("/cooking/start", protect, checkAdmin, async (req, res) => {
  const { order_no } = req.body;
  const start_cook_time = formatDate();
  const state = "cooking";

  try {
    const result = await pool.query(
      `UPDATE carts 
       SET state = $1, start_cook_time = $2 
       WHERE order_no = $3 
       RETURNING *;`,
      [state, start_cook_time, order_no]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// put ordered by cooked_time //////////////////
adminRouter.put("/cooking/complete", protect, checkAdmin, async (req, res) => {
  const { order_no } = req.body;
  const cooked_time = formatDate();
  const state = "cooked";

  try {
    const result = await pool.query(
      `UPDATE carts 
       SET state = $1, cooked_time = $2 
       WHERE order_no = $3 
       RETURNING *;`,
      [state, cooked_time, order_no]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// put cancel to order //////////////////
adminRouter.put("/cancel", protect, checkAdmin, async (req, res) => {
  const { order_no } = req.body;
  const cancel_time = formatDate();
  const state = "cancel";

  try {
    const result = await pool.query(
      `UPDATE carts 
       SET state = $1, cancel_time = $2
       WHERE order_no = $3
       RETURNING *;`,
      [state, cancel_time, order_no]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// get ordered for rider //////////////////
adminRouter.get("/rider", protect, checkAdmin, async (req, res) => {
  const { state, page, order_no } = req.query;
  const limit = 12;
  const offset = (page - 1) * limit;

  try {
    const states = state ? state.split(",") : ["cooked", "sending", "sended"];
    const queryParams = [states, limit, offset];

    let orderNoCondition = "";

    if (order_no) {
      orderNoCondition = `AND ca.order_no = $4`;
      queryParams.push(order_no);
    }

    const result = await pool.query(
      `SELECT DISTINCT ON (ca.order_no) 
        ca.order_no, 
        ca.cooked_time, 
        ca.state, 
        ca.total_prices, 
        ca.comment
      FROM 
        carts ca
      WHERE
        ca.state = ANY($1)
        ${orderNoCondition}
      ORDER BY ca.order_no
      LIMIT $2 OFFSET $3;`,
      queryParams
    );

    const orderNos = result.rows.map((order) => order.order_no);

    const itemsResult = await pool.query(
      `SELECT 
        ca.order_no, 
        c.food_name, 
        ci.amount
      FROM 
        carts ca
      JOIN 
        cart_items ci ON ca.cart_id = ci.cart_id
      JOIN 
        catalog c ON ci.catalog_id = c.catalog_id
      WHERE
        ca.order_no = ANY($1);`,
      [orderNos]
    );

    const itemsGrouped = itemsResult.rows.reduce((acc, item) => {
      if (!acc[item.order_no]) {
        acc[item.order_no] = [];
      }
      acc[item.order_no].push({
        food_name: item.food_name,
        amount: item.amount,
      });
      return acc;
    }, {});

    const groupedArray = result.rows.map((order) => ({
      ...order,
      items: itemsGrouped[order.order_no] || [],
    }));

    res.status(200).json({
      message: "success",
      data: groupedArray,
      page: Number(page),
      limit: limit,
    });
  } catch (err) {
    console.error("Error getting data:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// put sending by send_time //////////////////
adminRouter.put("/rider/sending", protect, checkAdmin, async (req, res) => {
  const { order_no } = req.body;
  const sending_time = formatDate();
  const state = "sending";

  try {
    const result = await pool.query(
      `UPDATE carts 
       SET state = $1, sending_time = $2 
       WHERE order_no = $3 
       RETURNING *;`,
      [state, sending_time, order_no]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// put sended by sended_time //////////////////
adminRouter.put("/rider/sended", protect, checkAdmin, async (req, res) => {
  const { order_no } = req.body;
  const sended_time = formatDate();
  const state = "sended";

  try {
    const result = await pool.query(
      `UPDATE carts 
       SET state = $1, sended_time = $2 
       WHERE order_no = $3 
       RETURNING *;`,
      [state, sended_time, order_no]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// put finish by send_time //////////////////
adminRouter.put("/rider/finish", protect, checkAdmin, async (req, res) => {
  const { order_no } = req.body;
  const finish_time = formatDate();
  const state = "finish";

  try {
    const result = await pool.query(
      `UPDATE carts 
       SET state = $1, finish_time = $2 
       WHERE order_no = $3 
       RETURNING *;`,
      [state, finish_time, order_no]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// delete menu //////////////////
adminRouter.delete("/:id", protect, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM catalog WHERE catalog_id = $1 RETURNING catalog_id;",
      [id]
    );
    return res.json({
      message: "deleted successfully",
    });
  } catch (err) {
    console.error("error");
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// get total sales for statistics-page //////////////////
adminRouter.get("/statistics", protect, checkAdmin, async (req, res) => {
  try {
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;

    let query = `
      SELECT 
        SUM(total_prices) AS total_sales, 
        COUNT(CASE WHEN state = 'finish' THEN finish_time END) AS finish_orders,
        COUNT(CASE WHEN state = 'cancel' THEN cancel_time END) AS cancel_orders
      FROM 
        carts
      WHERE 
        state IN ('finish', 'cancel')
        AND (
          EXTRACT(YEAR FROM finish_time) = $1 OR 
          EXTRACT(YEAR FROM cancel_time) = $1
        )
    `;

    const queryParams = [year];

    if (month) {
      query += ` AND (
                    EXTRACT(MONTH FROM finish_time) = $2 OR 
                    EXTRACT(MONTH FROM cancel_time) = $2
                  )`;
      queryParams.push(month);
    }

    if (day) {
      query += ` AND (
                    EXTRACT(DAY FROM finish_time) = $3 OR 
                    EXTRACT(DAY FROM cancel_time) = $3
                  )`;
      queryParams.push(day);
    }

    const result = await pool.query(query, queryParams);
    console.log("data", result.rows[0]);

    const finishesOrder = result.rows[0].finish_orders || 0;
    const cancelOrders = result.rows[0].cancel_orders || 0;
    const totalSales = result.rows[0].total_sales || 0;
    const newTotalSales = parseInt(totalSales, 10).toLocaleString("en-US");

    return res.status(200).json({ newTotalSales, finishesOrder, cancelOrders });
  } catch (error) {
    console.error("Error fetching total sales:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default adminRouter;
