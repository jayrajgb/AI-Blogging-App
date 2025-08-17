import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/appContext";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <>
      <div className="flex h-12 items-center justify-between p-4 sm:px-12 md:h-20">
        <img
          src="/logo.png"
          alt="logo"
          className="h-8 cursor-pointer md:h-16"
          onClick={() => navigate("/")}
        />
        <button
          className="bg-primary cursor-pointer rounded-full px-6 py-2 text-xs text-white md:px-10 md:py-3 md:text-sm"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
