import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ handleClose, content, header }) {
  return (
    <div className="fixed inset-0 bg-black/55 text-black flex justify-center items-start z-50 px-4">
      <div className="w-full sm:w-3/4 md:w-1/2 bg-white rounded-lg h-fit mt-20 sm:mt-32 p-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-2xl sm:text-4xl font-semibold">{header}</div>
          <div
            onClick={handleClose}
            className="cursor-pointer hover:text-red-500"
          >
            <CloseIcon sx={{ fontSize: "32px" }} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 sm:mt-10">{content}</div>
      </div>
    </div>
  );
}
