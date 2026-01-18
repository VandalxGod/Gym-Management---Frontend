import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

export default function MemberCard({ item }) {
  if (!item || !item._id) return null;

  // ✅ Safe date handling
  const formattedDate = item.nextBillDate
    ? new Date(item.nextBillDate).toLocaleDateString("en-GB")
    : "N/A";

  return (
    <Link
      to={`/member/${item._id}`}
      className="
        bg-white rounded-2xl
        px-4 py-5
        hover:bg-zinc-900 hover:text-white
        cursor-pointer
        transition-all duration-300
        flex flex-col items-center
        w-full
        h-full
        shadow-sm hover:shadow-lg
      "
    >
      {/* ================= PROFILE IMAGE ================= */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
        <div className="w-full h-full border-2 rounded-full p-1 flex items-center justify-center">
          <img
            className="w-full h-full rounded-full object-cover"
            src={item.profilePic || "https://via.placeholder.com/150"}
            alt="profile pic"
          />
        </div>

        {/* Status Indicator */}
        <CircleIcon
          className="absolute top-1 left-1"
          sx={{ color: item.status === "Active" ? "greenyellow" : "red" }}
        />
      </div>

      {/* ================= NAME ================= */}
      <div className="text-center text-base sm:text-lg font-semibold font-mono leading-tight">
        {item.name || "Unnamed Member"}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="mt-1 text-center text-sm sm:text-base font-mono opacity-90">
        {item.mobileNo ? `+91 ${item.mobileNo}` : "No Mobile"}
      </div>

      {/* ================= NEXT BILL DATE ================= */}
      <div className="mt-2 text-center text-xs sm:text-sm font-mono opacity-80">
        Next Bill Date: {formattedDate}
      </div>
    </Link>
  );
}
