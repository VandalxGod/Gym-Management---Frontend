import React from "react";
import Login from "../../components/login/Login.jsx";
import Signup from "../../components/Signup/Signup.jsx";
import ParticleBackground from "../../components/ParticleBackground/ParticleBackground.jsx";
import "./Home.css";

export default function Home() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* Animated Particle Background */}
      <ParticleBackground />

      {/* Top Bar */}
      <div
        className="
          relative z-10
          w-full
          py-3 sm:py-4 px-4 sm:px-8
          backdrop-blur-xl
          bg-white/5
          border-b border-white/20
          text-white
          text-xl sm:text-2xl
          font-semibold
          tracking-wide
          text-center sm:text-left
        "
      >
        Yeah Buddy
      </div>

      {/* Main Content */}
      <div className="Bgphoto relative z-10 flex items-center">
        <div
          className="
            w-full
            flex flex-col lg:flex-row
            items-center
            justify-center
            gap-8 lg:gap-16
            px-4 sm:px-8
          "
        >
          <Login />
          <Signup />
        </div>
      </div>
    </div>
  );
}
