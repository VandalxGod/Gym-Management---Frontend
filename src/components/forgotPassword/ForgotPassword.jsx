import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';


export default function ForgotPassword() {
    const [emailSubmit, setEmailSumbit] = useState(false);
    const [otpValidate, setOtpValidate] = useState(false);
    const [loader, setLoader] = useState(false);
    const [contentValue, setContentValue] = useState("Submit Your Email ")
    const [InputField, setInputField] = useState({ email: "", otp: "", newPassword: "" });


    const handleSubmit = () => {
        if (!emailSubmit) {

            sendOtp();

        }
        else if (emailSubmit && !otpValidate) {

            verifyOtp();
        }else{
            changePassword();
        }
    }
    const changePassword = async () => {
        setLoader(true);
<<<<<<< HEAD
        await axios.post("http://localhost:4000/auth/reset-password",{email:InputField.email, newPassword:InputField.newPassword}).then((response) => {
=======
        await axios.post("https://gym-management-backend-og62.onrender.com/auth/reset-password",{email:InputField.email, newPassword:InputField.newPassword}).then((response) => {
>>>>>>> 98be98cfc67761beb7eed0fe7e2bb331a7911c38
            toast.success(response.data.message);
            setLoader(false);
        }).catch(err => {
            toast.error("Some technical issue while sending Mail")
            console.log(err);
            setLoader(false);
        })

    }


    const verifyOtp = async () => {
        setLoader(true);
<<<<<<< HEAD
        await axios.post("http://localhost:4000/auth/reset-password/checkOtp", { email:InputField.email, otp:InputField.otp }).then((response) => {
=======
        await axios.post("https://gym-management-backend-og62.onrender.com/auth/reset-password/checkOtp", { email:InputField.email, otp:InputField.otp }).then((response) => {
>>>>>>> 98be98cfc67761beb7eed0fe7e2bb331a7911c38
            setOtpValidate(true);
            setContentValue("Submit Your Password");
            toast.success(response.data.message);
            setLoader(false);

        }).catch(err => {
            toast.error("Some technical issue while sending Mail")
            console.log(err);
            setLoader(false);
        })


    }
    const sendOtp = async () => {
        setLoader(true);
<<<<<<< HEAD
        await axios.post("http://localhost:4000/auth/reset-password/sendOtp", { email: InputField.email }).then((response) => {
=======
        await axios.post("https://gym-management-backend-og62.onrender.com/reset-password/sendOtp", { email: InputField.email }).then((response) => {
>>>>>>> 98be98cfc67761beb7eed0fe7e2bb331a7911c38
            setEmailSumbit(true);
            setContentValue("Submit Your OTP");
            toast.success(response.data.message);
            setLoader(false);

        }).catch(err => {
            toast.error("Some technical issue while sending Mail")
            console.log(err);
            setLoader(false);
        })

    }

    const handleOnChange = (event, name) => {
        setInputField({ ...InputField, [name]: event.target.value })
    }
    console.log(InputField);

    return (
        <div className="w-full">
            <div className="w-full mb-5">
                <div>Enter Your Email</div>
                <input
                    type="text" value={InputField.email} onChange={(event) => { handleOnChange(event, "email") }}
                    className="w-1/2 p-2 rounded-lg bg-white border-2 border-zinc-400"
                    placeholder="Enter Email"
                />

            </div>

            {
                emailSubmit && <div className="w-full mb-5">
                    <div>Enter Your OTP</div>
                    <input
                        type="email" value={InputField.otp} onChange={(event) => { handleOnChange(event, "otp") }}
                        className="w-1/2 p-2 rounded-lg bg-white border-2 border-zinc-400"
                        placeholder="Enter Email"
                    />

                </div>
            }

            {
                otpValidate && <div className="w-full mb-5">
                    <div>Enter Your New password</div>
                    <input
                        type="text" value={InputField.newPassword} onChange={(event) => { handleOnChange(event, "newPassword") }}
                        className="w-1/2 p-2 rounded-lg bg-white border-2 border-zinc-400"
                        placeholder="Enter new password"
                    />

                </div>
            }

            <div className="bg-zinc-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold border-2 cursor-pointer hover:bg-white hover:text-black" onClick={() => handleSubmit()}>{contentValue}</div>
            {loader && <Loader />}
            <ToastContainer />
        </div>
    )
}