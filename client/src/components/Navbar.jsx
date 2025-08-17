import React from "react";
// import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="mx-8 flex items-center justify-between py-5 sm:mx-20 xl:mx-32">
      {/* <img src="/logo.png" alt="logo" className="w-32 sm:w-44" /> */}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="" className="h-10 md:h-16" />
      </div>
      <button
        className="bg-primary group flex cursor-pointer items-center gap-2 rounded-full px-6 py-2 text-xs text-white md:px-10 md:py-3 md:text-sm"
        onClick={() => navigate("/admin")}
      >
        {token ? "Dashboard" : "Login"}
        <span>
          <ArrowRight
            className="transition-all duration-300 group-hover:translate-x-1"
            size={12}
          />
        </span>
      </button>
    </div>
  );
};

export default Navbar;
