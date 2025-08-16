import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentItem from "../../components/admin/CommentItem";
import { MessagesSquare } from "lucide-react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    // setComments(comments_data);
    try {
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="bg-secondary/20 flex-1 px-5 pt-5 sm:pt-12 sm:pl-16">
      <div className="flex max-w-3xl items-center justify-between">
        <h1 className="flex gap-x-2">
          <span>
            <MessagesSquare size={20} />
          </span>
          Comments
        </h1>
        <div className="flex gap-4">
          <button
            className={`shadow-custom-sm cursor-pointer rounded-full border px-4 py-1 text-xs ${filter === "Approved" ? "text-primary" : "text-mytext/30"} `}
            onClick={() => setFilter("Approved")}
          >
            Approved
          </button>
          <button
            className={`shadow-custom-sm cursor-pointer rounded-full border px-4 py-1 text-xs ${filter === "Not Approved" ? "text-primary" : "text-mytext/30"} `}
            onClick={() => setFilter("Not Approved")}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="scrollbar-hide relative mt-4 max-h-4/5 max-w-3xl overflow-x-auto rounded-lg bg-white shadow">
        <table className="text-mytext/30 w-full text-sm">
          <thead className="text-mytext/80 text-left text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") {
                  return comment.isApproved === true;
                }
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
