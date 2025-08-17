import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import TableItem from "../../components/admin/TableItem";
import { FilesIcon } from "lucide-react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    // setBlogs(blog_data);
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-secondary/20 flex-1 px-5 pt-5 sm:pt-12 sm:pl-16">
      <h1 className="flex gap-x-2">
        <span>
          <FilesIcon size={20} />
        </span>
        All Blogs
      </h1>
      <div className="scrollbar-hide relative mt-4 max-h-4/5 max-w-4xl overflow-x-auto rounded-lg bg-white shadow">
        <table className="text-mytext/60 w-full text-sm">
          <thead className="text-mytext/80 text-left text-xs uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <TableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlogs;
