import { X, XCircleIcon } from "lucide-react";
import React from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const TableItem = (props) => {
  const { title, createdAt } = props.blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const fetchBlogs = props.fetchBlogs;

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublished = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-mytext/20 border-y">
      <th className="px-2 py-4">{props.index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${props.blog.isPublished ? "text-mygreen" : "text-myred"}`}
        >
          {props.blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 text-xs">
        <div className="flex items-center gap-x-3">
          <button
            className="mt-1 cursor-pointer rounded border p-2"
            onClick={togglePublished}
          >
            {props.blog.isPublished ? "Unpublish" : "Publish"}
          </button>
          <X
            size={16}
            className="text-myred cursor-pointer transition-all hover:scale-105"
            onClick={deleteBlog}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
