import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify';


export default function Login() {
    const[loginField,setLoginField] = useState({"userName":"","password":""});


    const navigate = useNavigate();

    const handleLogin = async() => {
        // sessionStorage.setItem("isLogin", "true");
        // navigate('/dashboard'); 

        await axios.post("https://gym-management-backend-og62.onrender.com/auth/login",loginField,{withCredentials:true}).then((response)=>{
            console.log(response.data);
            localStorage.setItem('gymName',response.data.gym.gymName);
            localStorage.setItem('gymPic',response.data.gym.profilePic);
        
            localStorage.setItem('isLogin',true);
            localStorage.setItem('token',response.data.token);

            navigate('/dashboard'); 

        }).catch(err=>{
            const errorMessage = err.response.data.error;
            // console.log(errorMessage);
            toast.error(errorMessage);
        })

    };

    const handleOnChange = (event,name)=>{
        setLoginField({...loginField,[name]:event.target.value});
    }
    // console.log(loginField)
    return (

        <div className="w-1/3 p-10 mt-20 ml-20 bg-gray-50/45 h-fit">
            <div className="font-sand text-white text-center text-3x1 font-semibold " onClick={() => { handleLogin() }}>Login</div>
            <input
    type="text"
    value={loginField.userName}
    onChange={(event)=> handleOnChange(event,"userName")}
    className="w-full my-10 p-2 rounded-lg bg-white"
    placeholder="Enter UserName"
/>

<input
    type="password"
    value={loginField.password}
    onChange={(event)=> handleOnChange(event,"password")}
    className="w-full mb-10 p-2 rounded-lg bg-white"
    placeholder="Enter Password"
/>

            <div className="p-2 w-[100%] border-2 bg-zinc-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer" onClick={()=>{handleLogin()}}>Login</div>
            <ToastContainer />
        </div>
    )
}
>>>>>>> 98be98cfc67761beb7eed0fe7e2bb331a7911c38
