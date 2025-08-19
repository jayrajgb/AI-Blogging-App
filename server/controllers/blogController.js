import fs from "fs";
import imagekit from "../config/imagekit.js";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import { generateBlog, generateThumbnail } from "../config/gemini.js";

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
    // console.log(error.message);
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
    const { blogId } = req.params;
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
    const blog = await blogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    // console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await commentModel.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await commentModel
      .find({
        blog: blogId,
        isApproved: true,
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export async function generateContent(req, res) {
  try {
    const { prompt } = req.body;
    const content = await generateBlog(
      prompt + "Generate a blog content for this topic in simple text format"
    ); // can also use refine
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
}

export async function generateImage(req, res) {
  try {
    const { prompt } = req.body;
    const content = await generateThumbnail(prompt);
    if (Buffer.isBuffer(content)) {
      const base64Image = content.toString("base64");
      res.json({
        success: true,
        image: `data:image/png;base64,${base64Image}`, // Ready-to-use data URL
        // Or just return the base64 string:
        // imageData: base64Image
      });
    } else {
      res.json({ success: false, message: content });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
