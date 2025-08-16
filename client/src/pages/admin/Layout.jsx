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
      <div className="border-mytext/20 flex h-[70px] items-center justify-between border-b px-4 py-2 sm:px-12">
        <img
          src={assets.logo}
          alt="logo"
          className="w-32 cursor-pointer sm:w-40"
          onClick={() => navigate("/")}
        />
        <button
          className="bg-primary cursor-pointer rounded-full px-8 py-2 text-sm text-white"
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
