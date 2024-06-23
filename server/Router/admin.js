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

      // // Log the received file data
      // console.log("Received file:", req.file);

      const imageResult = await cloudinaryUpload(req.file);

      // // Log the result from Cloudinary
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

////////////////// get menu //////////////////

adminRouter.get("/", protect, checkAdmin, async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM catalog`);
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
