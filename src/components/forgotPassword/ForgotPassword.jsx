import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function ForgotPassword() {
  const [emailSubmit, setEmailSumbit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contentValue, setContentValue] = useState("Submit Your Email ");
  const [InputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    } else {
      changePassword();
    }
  };

  const changePassword = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:4000/auth/reset-password", {
        email: InputField.email,
        newPassword: InputField.newPassword,
      })
      .then((response) => {
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending Mail");
        console.log(err);
        setLoader(false);
      });
  };

  const verifyOtp = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:4000/auth/reset-password/checkOtp", {
        email: InputField.email,
        otp: InputField.otp,
      })
      .then((response) => {
        setOtpValidate(true);
        setContentValue("Submit Your Password");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending Mail");
        console.log(err);
        setLoader(false);
      });
  };

  const sendOtp = async () => {
    setLoader(true);
    await axios
      .post("http://localhost:4000/auth/reset-password/sendOtp", {
        email: InputField.email,
      })
      .then((response) => {
        setEmailSumbit(true);
        setContentValue("Submit Your OTP");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending Mail");
        console.log(err);
        setLoader(false);
      });
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...InputField, [name]: event.target.value });
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-md">
        {/* Email */}
        <div className="w-full mb-5">
          <div className="mb-1 font-semibold">Enter Your Email</div>
          <input
            type="text"
            value={InputField.email}
            onChange={(e) => handleOnChange(e, "email")}
            className="w-full p-2 rounded-lg bg-white border-2 border-zinc-400"
            placeholder="Enter Email"
          />
        </div>

        {/* OTP */}
        {emailSubmit && (
          <div className="w-full mb-5">
            <div className="mb-1 font-semibold">Enter Your OTP</div>
            <input
              type="text"
              value={InputField.otp}
              onChange={(e) => handleOnChange(e, "otp")}
              className="w-full p-2 rounded-lg bg-white border-2 border-zinc-400"
              placeholder="Enter OTP"
            />
          </div>
        )}

        {/* New Password */}
        {otpValidate && (
          <div className="w-full mb-5">
            <div className="mb-1 font-semibold">Enter Your New Password</div>
            <input
              type="text"
              value={InputField.newPassword}
              onChange={(e) => handleOnChange(e, "newPassword")}
              className="w-full p-2 rounded-lg bg-white border-2 border-zinc-400"
              placeholder="Enter new password"
            />
          </div>
        )}

        {/* Submit Button */}
        <div
          className="bg-zinc-800 text-white w-full p-3 rounded-lg text-center font-semibold border-2 cursor-pointer hover:bg-white hover:text-black"
          onClick={handleSubmit}
        >
          {contentValue}
        </div>

        {loader && <Loader />}
        <ToastContainer />
      </div>
    </div>
  );
}
