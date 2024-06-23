import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "burgerwebapp/demo-file-uploading",
      private: true,
    });

    // console.log("Cloudinary upload result:", result);

    await fs.unlink(file.path);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error in cloudinaryUpload:", error);
    throw error;
  }
};

export { cloudinaryUpload };
