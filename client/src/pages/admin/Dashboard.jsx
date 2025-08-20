import React, { useEffect, useState } from "react";
import { dashboard_data } from "../../assets/assets";
import {
  FilesIcon,
  LucideFileStack,
  MessagesSquare,
  SquarePen,
} from "lucide-react";
import TableItem from "../../components/admin/TableItem";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    // setDashboardData(dashboard_data);
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="bg-secondary/20 flex-1 p-4 md:p-10">
      <div className="flex flex-wrap gap-4">
        <div className="flex min-w-56 cursor-pointer items-center gap-4 rounded bg-white p-4 shadow transition-all hover:scale-105">
          <FilesIcon size={28} />
          <div>
            <p className="text-mytext/80 text-xl font-semibold">
              {dashboardData.blogs}
            </p>
            <p className="text-mytext/80 font-light">Blogs</p>
          </div>
        </div>
        <div className="flex min-w-56 cursor-pointer items-center gap-4 rounded bg-white p-4 shadow transition-all hover:scale-105">
          <MessagesSquare size={28} />
          <div>
            <p className="text-mytext/80 text-xl font-semibold">
              {dashboardData.comments}
            </p>
            <p className="text-mytext/80 font-light">Comments</p>
          </div>
        </div>
        <div className="flex min-w-56 cursor-pointer items-center gap-4 rounded bg-white p-4 shadow transition-all hover:scale-105">
          <SquarePen size={28} />
          <div>
            <p className="text-mytext/80 text-xl font-semibold">
              {dashboardData.drafts}
            </p>
            <p className="text-mytext/80 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-mytext/80 m-4 mt-6 flex items-center gap-3">
          <LucideFileStack size={20} />
          <p>Latest Blogs</p>
        </div>
        <div className="scrollbar-hide relative max-w-4xl overflow-x-auto rounded-lg bg-white shadow">
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
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <TableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
