import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [loginField, setLoginField] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await api.post("/auth/login", loginField);

    localStorage.setItem("gymName", response.data.gym.gymName);
    localStorage.setItem("gymPic", response.data.gym.profilePic);
    localStorage.setItem("isLogin", "true");

    navigate("/dashboard");
  } catch (err) {
    toast.error(err.response?.data?.error || "Login failed");
  }
};

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  return (
    <div className="w-full flex justify-center px-4 mt-10">
      <div
        className="
          w-full max-w-md
          p-6 sm:p-8
          backdrop-blur-xl bg-white/5
          border border-white/20
          rounded-2xl shadow-xl
          h-fit
          text-white
        "
      >
        <div className="text-center text-2xl sm:text-3xl font-semibold mb-6">
          Login
        </div>

        <input
          type="text"
          value={loginField.userName}
          onChange={(e) => handleOnChange(e, "userName")}
          className="
            w-full mb-4 px-4 py-3
            bg-white/10 text-white
            placeholder-white/50
            rounded-xl border border-white/20
            focus:outline-none focus:border-purple-500
          "
          placeholder="Enter Username"
        />

        <input
          type="password"
          value={loginField.password}
          onChange={(e) => handleOnChange(e, "password")}
          className="
            w-full mb-6 px-4 py-3
            bg-white/10 text-white
            placeholder-white/50
            rounded-xl border border-white/20
            focus:outline-none focus:border-purple-500
          "
          placeholder="Enter Password"
        />

        <div
          onClick={handleLogin}
          className="
            w-full py-3 rounded-xl text-center font-medium cursor-pointer
            bg-white/10 text-white
            border border-white/20
            hover:bg-white/20
            transition-all
          "
        >
          Login
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
