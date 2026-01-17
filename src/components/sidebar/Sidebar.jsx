import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

// api + toast
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [greeting, setGreeting] = useState("");
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("gymPic")
  );
  const [loading, setLoading] = useState(false);

  /* =========================
     GREETING LOGIC
  ========================= */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else if (hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("gymName");
    localStorage.removeItem("gymPic");
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  /* =========================
     PROFILE IMAGE UPLOAD
  ========================= */
  const uploadImage = async (event) => {
    if (!event.target.files[0]) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const cloud = await fetch(
        "https://api.cloudinary.com/v1_1/dgsfifvhy/image/upload",
        { method: "POST", body: data }
      );

      const result = await cloud.json();
      if (!result.secure_url) throw new Error("Upload failed");

      await api.put("/auth/update-profile-pic", {
        profilePic: result.secure_url,
      });

      localStorage.setItem("gymPic", result.secure_url);
      setProfilePic(result.secure_url);
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: <HomeIcon /> },
    { label: "Members", to: "/Member", icon: <GroupIcon /> },
  ];

  return (
    <aside
      className="
        fixed top-0 left-0 bottom-0
        w-full sm:w-64
        flex flex-col
        bg-gradient-to-b from-black via-zinc-900 to-black
        border-r border-white/10 shadow-xl
        text-white p-4 sm:p-6
        backdrop-blur-2xl
        z-40
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={profilePic}
              className="w-full h-full object-cover"
              alt="Gym"
            />
          </div>

          <input
            type="file"
            id="uploadBtn"
            className="hidden"
            onChange={uploadImage}
          />

          <label
            htmlFor="uploadBtn"
            className="
              absolute -bottom-3 left-1/2 -translate-x-1/2
              bg-white text-black text-xs px-3 py-1 rounded-full
              opacity-0 group-hover:opacity-100 transition
              shadow-md cursor-pointer
            "
          >
            {loading ? "..." : "Change"}
          </label>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-center">
          {localStorage.getItem("gymName")}
        </h1>

        <p className="text-sm text-zinc-400">{greeting}</p>
      </div>

      <div className="h-px bg-white/10 my-6"></div>

      {/* ================= NAV ================= */}
      <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
                ${
                  active
                    ? "bg-white text-black font-semibold"
                    : "text-zinc-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ================= LOGOUT ================= */}
      <button
        onClick={handleLogout}
        className="
          mt-4 flex items-center gap-3
          w-full px-4 py-3 rounded-xl
          bg-red-600 hover:bg-red-700 transition
          font-semibold
        "
      >
        <LogoutIcon />
        Logout
      </button>
    </aside>
  );
}
