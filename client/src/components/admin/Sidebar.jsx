import React from "react";
import { NavLink } from "react-router-dom";
import {
  FilesIcon,
  LucideHome,
  MessageSquareQuote,
  PlusSquare,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div>
      <NavLink
        end={true}
        to={"/admin"}
        className={(option) =>
          `flex cursor-pointer items-center gap-3 px-3 py-4 md:min-w-64 md:px-9 ${option.isActive && "bg-secondary/20 border-primary border-r-4"}`
        }
      >
        <LucideHome size={18} />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to={"/admin/addBlog"}
        className={(option) =>
          `flex cursor-pointer items-center gap-3 px-3 py-4 md:min-w-64 md:px-9 ${option.isActive && "bg-secondary/20 border-primary border-r-4"}`
        }
      >
        <PlusSquare size={18} />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>
      <NavLink
        to={"/admin/allBlog"}
        className={(option) =>
          `flex cursor-pointer items-center gap-3 px-3 py-4 md:min-w-64 md:px-9 ${option.isActive && "bg-secondary/20 border-primary border-r-4"}`
        }
      >
        <FilesIcon size={18} />
        <p className="hidden md:inline-block">All Blogs</p>
      </NavLink>
      <NavLink
        to={"/admin/comments"}
        className={(option) =>
          `flex cursor-pointer items-center gap-3 px-3 py-4 md:min-w-64 md:px-9 ${option.isActive && "bg-secondary/20 border-primary border-r-4"}`
        }
      >
        <MessageSquareQuote size={18} />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
