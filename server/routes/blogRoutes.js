import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  generateImage,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublished,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);

blogRouter.get("/all", getAllBlogs);

blogRouter.get("/:blogId", getBlogById);

blogRouter.post("/delete", auth, deleteBlogById);

blogRouter.post("/toggle-publish", auth, togglePublished);

blogRouter.post("/add-comment", addComment);

blogRouter.post("/comments", getBlogComments);

blogRouter.post("/generate", auth, generateContent);

blogRouter.post("/thumbnail", auth, generateImage);

export default blogRouter;
