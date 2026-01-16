import React from "react";
import Login from "../../components/login/Login.jsx";
import Signup from "../../components/Signup/Signup.jsx";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground.jsx";
// import './Home.css';

export default function Home() {
    return (
        <div className="w-full h-[100vh] relative overflow-hidden bg-black">
            
            <ParticleBackground />  {/* 🔥 Animated background */}

            <div className="
    relative z-10 
    w-full
    py-4 px-8 
    backdrop-blur-xl 
    bg-white/5 
    border-b border-white/20 
    text-white 
    text-2xl font-semibold 
    tracking-wide
    
">
    Yeah Buddy
</div>


            <div className="Bgphoto relative z-10">
                <div className="w-full lg:flex gap-39">
                    <Login />
                    <Signup />
                </div>
            </div>

        </div>
    );
}
