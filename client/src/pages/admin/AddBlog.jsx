import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const [img, setImg] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const generateContent = async () => {};

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
          <button
            className="bg-mytext/60 absolute right-2 bottom-1 ml-2 cursor-pointer rounded px-4 py-2 text-xs text-white hover:underline"
            type="button"
            onClick={generateContent}
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
            return <option value={category}>{category}</option>;
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
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
