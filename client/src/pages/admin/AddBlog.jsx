import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setIsloading] = useState(false);

  const [img, setImg] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);
      const blog = {
        title,
        subtitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", img);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setImg(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if (!title) {
      return toast.error("Please enter the title!");
    }
    try {
      setIsloading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-secondary/20 text-mytext/80 h-full flex-1 overflow-scroll"
    >
      <div className="w-full max-w-3xl rounded bg-white p-4 shadow sm:m-10 md:p-10">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!img ? assets.upload_area : URL.createObjectURL(img)}
            alt="upload"
            className="mt-2 h-16 cursor-pointer rounded"
          />
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <input
          className="border-mytext/20 mt-2 w-full max-w-lg rounded border p-2 outline-none"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="mt-4">Blog Subtitle</p>
        <input
          className="border-mytext/20 mt-2 w-full max-w-lg rounded border p-2 outline-none"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setSubtitle(e.target.value)}
          value={subtitle}
        />
        <p className="mt-4">Blog Description</p>
        <div className="relative h-74 max-w-lg pt-2 pb-16 sm:pb-10">
          <div ref={editorRef}></div>
          {loading && (
            <div className="bg-mytext/10 absolute top-0 right-0 bottom-0 left-0 mt-2 flex items-center justify-center">
              <div className="size-8 animate-spin rounded-full border-2 border-t-white"></div>
            </div>
          )}
          <button
            className="bg-mytext/60 absolute right-2 bottom-1 ml-2 cursor-pointer rounded px-4 py-2 text-xs text-white hover:underline"
            type="button"
            onClick={generateContent}
            disabled={loading}
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          className="text-mytext/50 border-mytext/20 mt-2 rounded border px-3 py-2 outline-none"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {blogCategories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <div className="mt-4 flex gap-2">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-110 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          className="bg-primary mt-8 h-10 w-40 cursor-pointer rounded text-sm text-white"
          type="submit"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
