import React, { useState } from "react";
import "./SignUp.css";
import Modal from "../modal/Modal";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

// Material UI
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function Signup() {
  const [InputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://i.pinimg.com/474x/2b/53/0d/2b530d0302e87d964541b0765ec5f52b.jpg",
  });

  const [forgotPassword, setForgotPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...InputField, [name]: event.target.value });
  };

  /* =========================
     UPLOAD IMAGE (CLOUDINARY)
  ========================= */
  const uploadImage = async (event) => {
    if (!event.target.files[0]) return;

    setLoaderImage(true);

    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgsfifvhy/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }

      setInputField((prev) => ({
        ...prev,
        profilePic: result.secure_url,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setLoaderImage(false);
    }
  };

  /* =========================
     REGISTER GYM
  ========================= */
  const handleRegister = async () => {
    const { email, gymName, userName, password, profilePic } = InputField;

    // Basic validation
    if (!email || !gymName || !userName || !password || !profilePic) {
      return toast.error("All fields are required");
    }

    if (loaderImage) {
      return toast.error("Please wait for image upload");
    }

    try {
      setRegistering(true);

      const response = await api.post("/auth/register", InputField);

      toast.success(response.data.message || "Registered successfully");

      // Optional: clear form after success
      setInputField({
        gymName: "",
        email: "",
        userName: "",
        password: "",
        profilePic:
          "https://i.pinimg.com/474x/2b/53/0d/2b530d0302e87d964541b0765ec5f52b.jpg",
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 mt-10">
      <div
        className="
          customSignup
          w-full max-w-md
          p-6 sm:p-8
          bg-white/5 backdrop-blur-xl
          border border-white/20
          rounded-2xl shadow-xl
          h-auto max-h-[80vh]
          overflow-auto
          text-white
        "
      >
        {/* Title */}
        <div className="text-center text-2xl sm:text-3xl font-semibold mb-6">
          Register your Gym
        </div>

        {/* Email */}
        <input
          type="email"
          value={InputField.email}
          onChange={(e) => handleOnChange(e, "email")}
          className="w-full mb-4 px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:border-purple-500"
          placeholder="Enter Email"
        />

        {/* Gym Name */}
        <input
          type="text"
          value={InputField.gymName}
          onChange={(e) => handleOnChange(e, "gymName")}
          className="w-full mb-4 px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:border-purple-500"
          placeholder="Enter Gym Name"
        />

        {/* Username */}
        <input
          type="text"
          value={InputField.userName}
          onChange={(e) => handleOnChange(e, "userName")}
          className="w-full mb-4 px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:border-purple-500"
          placeholder="Enter Username"
        />

        {/* Password */}
        <input
          type="password"
          value={InputField.password}
          onChange={(e) => handleOnChange(e, "password")}
          className="w-full mb-4 px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-xl border border-white/20 focus:outline-none focus:border-purple-500"
          placeholder="Enter Password"
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={uploadImage}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-sm text-white/70"
        />

        {/* Image Upload Loader */}
        {loaderImage && (
          <Stack sx={{ width: "100%" }} spacing={2} className="mb-4">
            <LinearProgress color="inherit" />
          </Stack>
        )}

        {/* Preview Image */}
        <div className="flex justify-center mb-6">
          <img
            src={InputField.profilePic}
            className="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] rounded-2xl object-cover border border-white/20"
            alt="Gym Preview"
          />
        </div>

        {/* Register Button */}
        <div
          onClick={handleRegister}
          className={`w-full py-3 mb-3 rounded-xl text-center font-medium cursor-pointer 
            bg-white/10 text-white border border-white/20 hover:bg-white/20 transition
            ${registering ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          {registering ? "Registering..." : "Register"}
        </div>

        {/* Forgot Password */}
        <div
          onClick={handleClose}
          className="w-full py-3 rounded-xl text-center font-medium cursor-pointer border border-white/25 text-white/90 hover:bg-white/10 transition"
        >
          Forgot Password
        </div>

        {forgotPassword && (
          <Modal
            header="Forgot Password"
            handleClose={handleClose}
            content={<ForgotPassword />}
          />
        )}

        <ToastContainer />
      </div>
    </div>
  );
}
