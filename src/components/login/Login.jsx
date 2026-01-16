import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {

    const [loginField, setLoginField] = useState({
        userName: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = async () => {
        await axios.post("http://localhost:4000/auth/login", loginField, { withCredentials: true })
            .then((response) => {
                localStorage.setItem('gymName', response.data.gym.gymName);
                localStorage.setItem('gymPic', response.data.gym.profilePic);
                localStorage.setItem('isLogin', true);
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            })
            .catch(err => {
                toast.error(err.response?.data?.error || "Login failed");
            });
    };

    const handleOnChange = (event, name) => {
        setLoginField({ ...loginField, [name]: event.target.value });
    };

    return (
        <div
            className="
                w-full sm:w-full md:w-1/2 lg:w-1/3
                p-6 sm:p-8 md:p-10
                mt-10 sm:mt-12 md:mt-20
                ml-0 sm:ml-0 md:ml-20
                backdrop-blur-xl bg-white/5  
                border border-white/20
                rounded-2xl shadow-xl 
                h-fit
                text-white
            "
        >

            {/* Title */}
            <div className="font-sans text-center text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
                Login
            </div>

            {/* Username */}
            <input
                type="text"
                value={loginField.userName}
                onChange={(event) => handleOnChange(event, "userName")}
                className="
                    w-full mb-4 sm:mb-6 px-4 py-3
                    bg-white/10 text-white 
                    placeholder-white/50
                    rounded-xl border border-white/20 
                    transition-all duration-300
                    focus:outline-none 
                    focus:border-purple-500
                "
                placeholder="Enter Username"
            />

            {/* Password */}
            <input
                type="password"
                value={loginField.password}
                onChange={(event) => handleOnChange(event, "password")}
                className="
                    w-full mb-6 sm:mb-8 px-4 py-3
                    bg-white/10 text-white
                    placeholder-white/50
                    rounded-xl border border-white/20
                    transition-all duration-300
                    focus:outline-none 
                    focus:border-purple-500
                "
                placeholder="Enter Password"
            />

            {/* Login Button */}
            <div
                onClick={handleLogin}
                className="
                    w-full py-3 rounded-xl text-center font-medium cursor-pointer
                    bg-white/10 backdrop-blur-xl text-white
                    border border-white/20
                    transition-all duration-300
                    hover:bg-white/20
                "
            >
                Login
            </div>

            <ToastContainer />
        </div>
    );
}
