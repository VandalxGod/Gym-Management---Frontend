import React, { useState } from "react";
import './SignUp.css';
import Modal from "../modal/Modal";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

//Material.ui
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function Signup() {

    const [InputField, setInputField] = useState({
        gymName: "",
        email: "",
        userName: "",
        password: "",
        profilePic: "https://i.pinimg.com/474x/2b/53/0d/2b530d0302e87d964541b0765ec5f52b.jpg"
    });

    const [forgotPassword, setForgotPassword] = useState(false);
    const [loaderImage, setLoaderimage] = useState(false);

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    };

    const handleOnchange = (event, name) => {
        setInputField({ ...InputField, [name]: event.target.value });
    };

    const uploadImage = async (event) => {
        setLoaderimage(true);
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'gym-management');

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dgsfifvhy/image/upload",
                data
            );
            const imageUrl = response.data.url;
            setInputField({ ...InputField, profilePic: imageUrl });
            setLoaderimage(false);
        } catch (err) {
            console.log(err);
            alert("Image upload failed");
            setLoaderimage(false);
        }
    };

    const handleRegister = async () => {
        await axios.post("http://localhost:4000/auth/register", InputField)
            .then((resp) => {
                toast.success(resp.data.message);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    };

    return (
        <div
            className="
                customSignup 
                w-full sm:w-full md:w-1/2 lg:w-1/3
                p-6 sm:p-8 md:p-10 
                mt-10 sm:mt-12 md:mt-20 
                ml-0 sm:ml-0 md:ml-20 
                bg-white/5 backdrop-blur-xl 
                border border-white/20 
                rounded-2xl shadow-xl 
                h-auto md:h-[450px] 
                overflow-auto 
                text-white
            "
        >

            {/* Title */}
            <div className="font-sans text-center text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
                Register your Gym
            </div>

            {/* Email */}
            <input
                type="email"
                value={InputField.email}
                onChange={(event) => handleOnchange(event, "email")}
                className="w-full mb-4 sm:mb-5 px-4 py-3 
                           bg-white/10 text-white 
                           placeholder-white/50 
                           rounded-xl border border-white/20 
                           transition-all duration-300
                           focus:outline-none focus:border-purple-500"
                placeholder="Enter Email"
            />

            {/* Gym Name */}
            <input
                type="text"
                value={InputField.gymName}
                onChange={(event) => handleOnchange(event, "gymName")}
                className="w-full mb-4 sm:mb-5 px-4 py-3 
                           bg-white/10 text-white 
                           placeholder-white/50 
                           rounded-xl border border-white/20 
                           transition-all duration-300
                           focus:outline-none focus:border-purple-500"
                placeholder="Enter Gym Name"
            />

            {/* Username */}
            <input
                type="text"
                value={InputField.userName}
                onChange={(event) => handleOnchange(event, "userName")}
                className="w-full mb-4 sm:mb-5 px-4 py-3 
                           bg-white/10 text-white 
                           placeholder-white/50 
                           rounded-xl border border-white/20 
                           transition-all duration-300
                           focus:outline-none focus:border-purple-500"
                placeholder="Enter Username"
            />

            {/* Password */}
            <input
                type="password"
                value={InputField.password}
                onChange={(event) => handleOnchange(event, "password")}
                className="w-full mb-4 sm:mb-5 px-4 py-3 
                           bg-white/10 text-white 
                           placeholder-white/50 
                           rounded-xl border border-white/20 
                           transition-all duration-300
                           focus:outline-none focus:border-purple-500"
                placeholder="Enter Password"
            />

            {/* File Upload */}
            <input
                type="file"
                onChange={(e) => uploadImage(e)}
                className="w-full mb-4 sm:mb-5 px-4 py-3 
                           rounded-xl border border-white/20 
                           bg-white/5 text-sm text-white/70
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:bg-white/20 file:text-white
                           hover:file:bg-white/30
                           transition-all"
            />

            {/* Loader */}
            {loaderImage && (
                <Stack sx={{ width: '100%', color: 'grey.800' }} spacing={2} className="mb-4">
                    <LinearProgress color="inherit" />
                </Stack>
            )}

            {/* Preview Image */}
            <div className="flex justify-center mb-6">
                <img
                    src={InputField.profilePic}
                    className="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] 
                               rounded-2xl object-cover border border-white/20"
                    alt="Gym Preview"
                />
            </div>

            {/* Register Button (NO PURPLE BORDER CHANGE) */}
            <div
                className="w-full py-3 mb-3 rounded-xl text-center font-medium cursor-pointer
                           bg-white/10 backdrop-blur-xl text-white 
                           border border-white/20
                           transition-all duration-300
                           hover:bg-white/20"
                onClick={handleRegister}
            >
                Register
            </div>

            {/* Forgot Password */}
            <div
                className="w-full py-3 rounded-xl text-center font-medium cursor-pointer
                           border border-white/25 text-white/90
                           bg-transparent
                           transition-all duration-300
                           hover:bg-white/10 hover:text-white"
                onClick={handleClose}
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
    );
}
