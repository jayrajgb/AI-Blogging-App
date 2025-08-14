import fs from "fs";
import imagekit from "../config/imagekit.js";
import blogModel from "../models/blogModel.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const img = req.file;

    if (!title || !description || !category || !img) {
      return res.json({ success: false, message: "Incomplete info!" });
    }

    const fileBuffer = fs.readFileSync(img.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: img.originalname,
      folder: "/blogs",
    });

    const optimizedImgUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
          format: "webp",
          width: "1280",
        },
      ],
    });

    const image = optimizedImgUrl;

    await blogModel.create({
      title,
      subtitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ succes: true, message: "Blog added successfully!" });
  } catch (error) {
    res.json({ succes: false, message: error.message });
    console.log(error.message);
  }
};
