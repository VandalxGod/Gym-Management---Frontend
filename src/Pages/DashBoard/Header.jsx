import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Header({ isSidebarOpen, toggleSidebar }) {
  return (
    <header
      className="
        h-16
        bg-white
        border-b
        shadow-sm
        flex items-center
        gap-3 sm:gap-4
        px-3 sm:px-4 md:px-6
        sticky top-0
        z-10
      "
    >
      {/* ================= MENU BUTTON ================= */}
      <button
        onClick={toggleSidebar}
        className="
          p-2 sm:p-2.5
          rounded-lg
          hover:bg-gray-200
          transition
          flex items-center justify-center
          shrink-0
        "
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? (
          <ChevronLeftIcon fontSize="large" />
        ) : (
          <MenuIcon fontSize="large" />
        )}
      </button>

      {/* ================= TITLE ================= */}
      <h1
        className="
          text-lg sm:text-xl md:text-2xl
          font-semibold
          text-gray-800
          truncate
        "
      >
        Gym Management System
      </h1>
    </header>
  );
}
