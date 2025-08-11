import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div className="text-mytext relative my-12 flex justify-center gap-4 max-sm:text-xs sm:gap-8">
        {blogCategories.map((item, index) => (
          <div key={index} className="relative">
            <button
              className={`cursor-pointer px-4 pt-1 ${menu === item && "text-white"}`}
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
      <div></div>
    </div>
  );
};

export default BlogList;
