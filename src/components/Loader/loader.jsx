import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <div
      className="
        fixed inset-0
        flex items-center justify-center
        bg-black/50
        z-50
      "
    >
      <Box
        className="flex items-center justify-center"
        aria-label="Loading"
      >
        <CircularProgress
          sx={{ color: "white" }}
          size={window.innerWidth < 640 ? "4rem" : "6rem"}
          thickness={4}
        />
      </Box>
    </div>
  );
}
