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
        bg-white rounded-xl p-3
        hover:bg-zinc-900 hover:text-white
        cursor-pointer transition-all duration-300
        flex flex-col items-center
        w-full sm:w-[220px]
      "
    >
      {/* Profile Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full">
        <img
          className="w-full h-full rounded-full object-cover"
          src={item.profilePic || "https://via.placeholder.com/150"}
          alt="profile pic"
        />
        <CircleIcon
          className="absolute top-1 left-1"
          sx={{ color: item.status === "Active" ? "greenyellow" : "red" }}
        />
      </div>

      {/* Name */}
      <div className="mt-4 text-center text-lg font-semibold font-mono">
        {item.name || "Unnamed Member"}
      </div>

      {/* Mobile */}
      <div className="mt-1 text-center text-base sm:text-lg font-mono">
        {item.mobileNo ? `+91 ${item.mobileNo}` : "No Mobile"}
      </div>

      {/* Next Bill Date */}
      <div className="mt-1 text-center text-sm sm:text-base font-mono">
        Next Bill Date: {formattedDate}
      </div>
    </Link>
  );
}
