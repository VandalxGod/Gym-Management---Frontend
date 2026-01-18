import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../Pages/DashBoard/Header";

export default function ProtectedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed sm:static
          inset-y-0 left-0
          z-40
          transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
          }
          w-1/2 sm:w-64
        `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-col flex-1">
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 sm:hidden z-30"
        />
      )}
    </div>
  );
}
