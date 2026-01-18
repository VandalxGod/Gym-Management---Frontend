import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../Pages/DashBoard/Header";

export default function ProtectedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          fixed sm:static
          inset-y-0 left-0
          z-40
          ${isSidebarOpen ? "w-1/2 sm:w-64" : "w-0"}
          overflow-hidden
        `}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-col flex-1">
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
