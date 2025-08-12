import React from "react";
import { Sparkles } from "lucide-react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative mx-8 sm:mx-16 xl:mx-24">
      <div className="mt-20 mb-8 text-center">
        {/* AI Feature Button */}
        <div className="border-primary/40 bg-secondary/20 text-primary mb-4 inline-flex items-center justify-center gap-4 rounded-full border px-6 py-2 text-sm">
          <p>AI Features Integrated</p>
          <Sparkles size={12} />
        </div>

        {/* Title */}
        <h1 className="text-mytext mt-4 text-3xl font-semibold sm:text-6xl sm:leading-16">
          New Era Of <span className="text-primary">Blogging</span> <br />
          Globally
        </h1>

        {/* Paragraph */}
        <p className="text-mytext m-auto my-6 max-w-2xl max-sm:text-xs sm:my-8">
          From local thoughts to worldwide impact — a new stage for every
          storyteller. Explore fresh perspectives, limitless reach — blogging
          like never before.
        </p>

        {/* Form */}
        <form
          action=""
          className="border-mytext/10 mx-auto flex max-w-lg justify-between overflow-hidden rounded border bg-white max-sm:scale-75"
        >
          <input
            type="text"
            placeholder="Search blogs"
            name=""
            id=""
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-primary m-2 cursor-pointer rounded px-8 py-2 text-white transition-all hover:scale-105"
          >
            Search
          </button>
        </form>
      </div>
      <img
        src={assets.gradientBackground}
        alt="bg"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
