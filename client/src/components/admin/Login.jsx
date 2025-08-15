import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-secondary/50 shadow-primary/15 w-full max-w-sm rounded-lg border p-6 shadow-xl max-md:m-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span>
              Login
            </h1>
            <p className="font-light">Enter credentials to access admin!</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="text-mytext mt-6 w-full sm:max-w-md"
          >
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                className="border-mytext/20 mb-6 border-b-2 p-2 outline-none"
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                className="border-mytext/20 mb-6 border-b-2 p-2 outline-none"
                type="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="bg-primary/80 hover:bg-primary w-full cursor-pointer rounded py-3 font-medium text-white transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
