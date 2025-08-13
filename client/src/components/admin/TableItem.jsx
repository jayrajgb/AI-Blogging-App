import { X, XCircleIcon } from "lucide-react";
import React from "react";

const TableItem = (props) => {
  const { title, createdAt } = props.blog;
  const BlodDate = new Date(createdAt);
  return (
    <tr className="border-mytext/20 border-y">
      <th className="px-2 py-4">{props.index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlodDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${props.blog.isPublished ? "text-mygreen" : "text-myred"}`}
        >
          {props.blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 text-xs">
        <div className="flex items-center gap-x-3">
          <button className="mt-1 cursor-pointer rounded border p-2">
            {props.blog.isPublished ? "Unpublish" : "Publish"}
          </button>
          <X
            size={16}
            className="text-myred cursor-pointer transition-all hover:scale-105"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
