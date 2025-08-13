import { CheckCircleIcon, Trash2 } from "lucide-react";
import React from "react";

const CommentItem = (props) => {
  const { blog, createdAt, _id } = props.comment;
  const BlogDate = new Date(createdAt);

  return (
    <tr className="border-mytext/20 border-y">
      <td className="px-6 py-4">
        <b className="text-mytext/60 font-medium">Blog</b> :{" "}
        <span className="text-mytext/50">{blog.title}</span>
        <br />
        <br />
        <b className="text-mytext/60 font-medium">Name</b> :{" "}
        <span className="text-mytext/50">{props.comment.name}</span>
        <br />
        <b className="text-mytext/60 font-medium">Comment</b> :{" "}
        <span className="text-mytext/50">{props.comment.content}</span>
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!props.comment.isApproved ? (
            <>
              <CheckCircleIcon
                size={16}
                className="text-mygreen cursor-pointer transition-all hover:scale-105"
              />
              <Trash2
                size={16}
                className="text-myred cursor-pointer transition-all hover:scale-105"
              />
            </>
          ) : (
            <>
              <p className="border-mygreen bg-mygreen/20 text-mygreen rounded-full border px-3 py-1 text-xs">
                Approved
              </p>
              <Trash2
                size={16}
                className="text-myred cursor-pointer transition-all hover:scale-105"
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CommentItem;
