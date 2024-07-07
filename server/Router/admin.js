import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";

const adminRouter = Router();
const upload = multer({ dest: "uploads/" });

////////////////// add menu //////////////////

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
      SELECT id, food_name, price, catalog, description, image_url
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

    const convertDataToArray = Object.entries(groupedData).map(
      ([catalog, items]) => ({
        catalog,
        items,
      })
    );

    return res.json({
      data: convertDataToArray,
    });
  } catch (error) {
    console.error("Error getting menu:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

////////////////// get menu by keyword //////////////////

adminRouter.get("/", protect, checkAdmin, async (req, res) => {
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

export default adminRouter;
