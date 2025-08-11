import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div className="text-mytext relative my-12 flex justify-center gap-4 max-sm:text-xs sm:gap-8">
        {blogCategories.map((item, index) => (
          <div key={index} className="relative">
            <button
              className={`cursor-pointer pt-2 sm:pt-1 ${menu === item && "px-4 text-white"}`}
              onClick={() => setMenu(item)}
            >
              {item}
              {menu === item && (
                <motion.div
                  className="bg-primary absolute top-0 right-0 left-0 -z-1 h-8 rounded-full"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="mx-8 mb-24 grid grid-cols-1 gap-8 sm:mx-16 sm:grid-cols-2 md:grid-cols-3 xl:mx-40 xl:grid-cols-4">
        {blog_data
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
