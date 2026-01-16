import React from "react";
// Material UI
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

export default function MemberCard({ item }) {
  return (
    <Link
      to={`/member/${item?._id}`}
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
          src={item?.profilePic}
          alt="profile pic"
        />
        <CircleIcon
          className="absolute top-1 left-1"
          sx={{ color: item?.status === "Active" ? "greenyellow" : "red" }}
        />
      </div>

      {/* Name */}
      <div className="mt-4 text-center text-lg font-semibold font-mono">
        {item?.name}
      </div>

      {/* Mobile */}
      <div className="mt-1 text-center text-base sm:text-lg font-mono">
        {"+91 " + item?.mobileNo}
      </div>

      {/* Next Bill Date */}
      <div className="mt-1 text-center text-sm sm:text-base font-mono">
        Next Bill Date:{" "}
        {item?.nextBillDate
          ?.slice(0, 10)
          .split("-")
          .reverse()
          .join("-")}
      </div>
    </Link>
  );
}
