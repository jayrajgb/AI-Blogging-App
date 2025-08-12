import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from "moment";
import { Facebook, Twitter } from "lucide-react";
import Loader from "../components/Loader";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === id);
    setData(data);
  };

  const fetchComments = async () => {
    setComments(comments_data);
  };

  const addComment = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return (
    <>
      {data ? (
        <div className="relative">
          <img
            src={assets.gradientBackground}
            alt="bg"
            className="absolute -top-50 -z-1 opacity-50"
          />
          <Navbar />
          <div className="text-mytext mt-20 text-center">
            <p className="text-primary py-4 font-medium">
              Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
            </p>
            <h1 className="text-mytext mx-auto mt-4 max-w-2xl text-2xl font-semibold sm:text-5xl">
              {data.title}
            </h1>
            <h2 className="mx-auto my-5 max-w-lg truncate">{data.subtitle}</h2>
            <p className="border-primary/30 bg-primary/5 text-primary mb-6 inline-block rounded-full border px-4 py-1 text-sm font-medium">
              Michael Brown
            </p>
          </div>
          <div className="mx-5 my-10 mt-6 max-w-5xl md:mx-auto">
            <img src={data.image} alt="data" className="mb-5 rounded-3xl" />
            <div
              className="rich-text mx-auto max-w-3xl"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>

            {/* Comments */}
            <div className="mx-auto mt-14 mb-10 max-w-3xl">
              <p className="mb-4 font-semibold">Comments ({comments.length})</p>
              <div className="flex flex-col gap-4">
                {comments.map((item, index) => (
                  <div
                    key={index}
                    className="bg-primary/5 border-primary/5 text-mytext relative max-w-xl rounded border p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <img src={assets.user_icon} alt="icon" className="w-6" />
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="ml-8 max-w-md text-sm">{item.content}</p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                      {Moment(item.createdAt).fromNow("")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comments */}
            <div className="mx-auto max-w-3xl">
              <p className="mb-4 font-semibold">Add comment</p>
              <form
                className="flex max-w-lg flex-col items-start gap-4"
                onSubmit={addComment}
              >
                <input
                  className="border-mytext/20 w-full rounded border p-2 outline-none"
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <textarea
                  className="border-mytext/20 h-48 w-full rounded border p-2 outline-none"
                  placeholder="Comment"
                  required
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                ></textarea>
                <button
                  type="submit"
                  className="bg-primary cursor-pointer rounded p-2 px-8 text-white transition-all hover:scale-105"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Share Buttons */}
            <div className="mx-auto my-24 max-w-3xl">
              <p className="my-4 font-semibold">Share this article</p>
              <div className="flex gap-x-4">
                <Facebook className="text-primary" />
                <Twitter className="text-primary" />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Blog;
