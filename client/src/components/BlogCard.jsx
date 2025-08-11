import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = (props) => {
  const { title, description, category, image, _id } = props.blog;
  const navigate = useNavigate();
  return (
    <div
      className="hover:shadow-primary/25 w-full overflow-hidden rounded-lg shadow duration-300 hover:scale-105"
      onClick={() => navigate(`/blog/${_id}`)}
    >
      <img src={image} alt="img" className="aspect-video" />
      <span className="bg-primary/10 text-primary mt-4 ml-5 inline-block rounded-full px-3 py-1 text-xs">
        {category}
      </span>
      <div className="p-5">
        <h5 className="text-mytext mb-2 font-medium">{title}</h5>
        {/* <p className="text-mytext mb-3 line-clamp-3 text-xs">{description}</p> */}
        <p
          className="text-mytext mb-3 line-clamp-3 text-xs"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
