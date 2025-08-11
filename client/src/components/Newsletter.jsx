import React from "react";

const Newsletter = () => {
  return (
    <div className="my-32 flex flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-semibold md:text-4xl">Never Miss a Blog!</h1>
      <p className="text-mytext pb-8 max-sm:text-xs">
        Subscribe to get the latest blog & exclusive news.
      </p>
      <form
        className="flex h-12 w-full max-w-2xl items-center justify-between md:h-14"
        action=""
      >
        <input
          className="border-mytext/20 text-mytext h-full w-full rounded-md rounded-r-none border border-r-0 px-3 outline-none"
          type="text"
          placeholder="Enter email"
          required
        />
        <button
          type="submit"
          className="bg-primary/80 hover:bg-primary h-full cursor-pointer rounded-md rounded-l-none px-8 text-white transition-all md:px-12"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
