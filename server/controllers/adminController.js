import jwt from "jsonwebtoken";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";

export const adminLogin = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const password = data.password;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    console.log(comments);
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const recentBlogs = await blogModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await blogModel.countDocuments();
    const comments = await commentModel.countDocuments();
    const drafts = await blogModel.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndDelete(id);
    await commentModel.deleteMany({ blog: id });
    res.json({ success: true, message: "Comment deleted!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await commentModel.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
