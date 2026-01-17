import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/Home/home";
import Dashboard from "./Pages/DashBoard/Dashboard";
import Member from "./Pages/member/Member";
import GeneralUser from "./Pages/GeneralUser/Generaluser";
import Memberdetail from "./Pages/MemberDetail/Memberdetail";

import "react-toastify/dist/ReactToastify.css";

/* 🔐 Protected Route Component */
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Member"
        element={
          <ProtectedRoute>
            <Member />
          </ProtectedRoute>
        }
      />

      <Route
        path="/specific/:page"
        element={
          <ProtectedRoute>
            <GeneralUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/member/:id"
        element={
          <ProtectedRoute>
            <Memberdetail />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
