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

    res.json({ success: true, message: "Blog added successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.parse;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.json({ succes: false, message: "Blog not found!" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await blogModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog deleted successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublished = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = blogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
