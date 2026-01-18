import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../Pages/DashBoard/Header";

export default function ProtectedLayout() {
  // 🔴 CHANGE IS HERE 👇
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-0"}
          overflow-hidden
        `}
      >
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen((p) => !p)}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
