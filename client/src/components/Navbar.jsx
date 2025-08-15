import React from "react";
// import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="mx-8 flex items-center justify-between py-5 sm:mx-20 xl:mx-32">
      {/* <img src={assets.logo} alt="logo" className="w-32 sm:w-44" /> */}
      <div
        className="w-32 cursor-pointer sm:w-44"
        onClick={() => navigate("/")}
      >
        Blogger
      </div>
      <button
        className="bg-primary group flex cursor-pointer items-center gap-2 rounded-full px-10 py-3 text-sm text-white"
        onClick={() => navigate("/admin")}
      >
        {token ? "Dashboard" : "Login"}
        <span>
          <ArrowRight
            className="transition-all duration-300 group-hover:translate-x-1"
            size={16}
          />
        </span>
      </button>
    </div>
  );
};

export default Navbar;
