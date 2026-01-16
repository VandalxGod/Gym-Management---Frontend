import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <Box>
        <CircularProgress
          sx={{
            color: "white",
          }}
          size={window.innerWidth < 640 ? "4rem" : "6rem"}
        />
      </Box>
    </div>
  );
}
