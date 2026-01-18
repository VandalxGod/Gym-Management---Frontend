import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({ handleClose, content, header }) {
  return (
    <div
      className="
        fixed inset-0
        bg-black/55
        text-black
        flex justify-center items-start
        z-50
        px-4
        overflow-y-auto
      "
    >
      <div
        className="
          w-full
          sm:w-3/4
          md:w-1/2
          bg-white
          rounded-2xl
          h-fit
          mt-16 sm:mt-24
          p-5 sm:p-6
          max-h-[90vh]
          overflow-y-auto
          shadow-xl
        "
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center gap-4">
          <div className="text-xl sm:text-3xl font-semibold break-words">
            {header}
          </div>

          <div
            onClick={handleClose}
            className="
              cursor-pointer
              hover:text-red-500
              flex-shrink-0
            "
          >
            <CloseIcon sx={{ fontSize: 32 }} />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="mt-6 sm:mt-8 pb-4">
          {content}
        </div>
      </div>
    </div>
  );
}
