import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/Home/home";
import Dashboard from "./Pages/DashBoard/Dashboard";
import Member from "./Pages/member/Member";
import GeneralUser from "./Pages/GeneralUser/Generaluser";
import Memberdetail from "./Pages/MemberDetail/Memberdetail";

// Layout
import ProtectedLayout from "./layouts/ProtectedLayout";

import "react-toastify/dist/ReactToastify.css";

/* 🔐 Protected Route */
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />

      {/* ================= PROTECTED ================= */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Member" element={<Member />} />
        <Route path="/specific/:page" element={<GeneralUser />} />
        <Route path="/member/:id" element={<Memberdetail />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
