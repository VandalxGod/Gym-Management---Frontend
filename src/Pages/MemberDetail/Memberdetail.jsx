import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

export default function Memberdetail() {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  /* ================= FETCH MEMBERSHIP PLANS ================= */
  const fetchMembership = async () => {
    try {
      const res = await api.get("/plans/get-membership");
      setMembership(res.data.membership || []);
      if (res.data.membership?.length > 0) {
        setPlanMember(res.data.membership[0]._id);
      }
    } catch {
      toast.error("Failed to load memberships");
    }
  };

  /* ================= FETCH MEMBER DATA ================= */
  const fetchData = async () => {
    try {
      const res = await api.get(`/members/get-member/${id}`);
      setData(res.data.member);
      setStatus(res.data.member.status);
    } catch {
      toast.error("Failed to load member");
    }
  };

  /* ================= STATUS TOGGLE ================= */
  const handleSwitchBtn = async () => {
    const newStatus = status === "Active" ? "Pending" : "Active";
    try {
      await api.post(`/members/change-status/${id}`, {
        status: newStatus,
      });
      setStatus(newStatus);
      toast.success("Status Updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ================= RENEW MEMBERSHIP ================= */
  const handleRenewSaveBtn = async () => {
    try {
      const res = await api.put(`/members/update-member-plan/${id}`, {
        membership: planMember,
      });
      setData(res.data.member);
      toast.success(res.data.message);
      setRenew(false);
    } catch {
      toast.error("Failed to renew membership");
    }
  };

  if (!data) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-full">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2
            px-4 py-2 rounded-xl
            border bg-white
            hover:bg-black hover:text-white
            transition
          "
        >
          <ChevronLeftIcon />
          Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Member Details
        </h1>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        {/* PROFILE SECTION */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-8 border-b">
          <img
            src={data.profilePic}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border"
          />

          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {data.name}
            </h2>
            <p className="text-gray-500">
              +91 {data.mobileNo}
            </p>

            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
          {/* NEXT BILL DATE */}
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Next Bill Date
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {new Date(data.nextBillDate).toLocaleDateString("en-GB")}
            </p>
          </div>

          {/* STATUS */}
          <div className="bg-gray-50 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Membership Status
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                {status}
              </p>
            </div>
            <Switch
              onChange={handleSwitchBtn}
              checked={status === "Active"}
              onColor="#16a34a"
              offColor="#f59e0b"
            />
          </div>

          {/* ADDRESS */}
          <div className="sm:col-span-2 bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-base font-medium text-gray-800 mt-1 leading-relaxed">
              {data.address || "No address provided"}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-8 border-t">
          <button
            onClick={() => setRenew((prev) => !prev)}
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Renew Membership
          </button>

          {renew && (
            <div className="mt-6 bg-gray-50 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Select New Plan
              </h3>

              <select
                value={planMember}
                onChange={(e) => setPlanMember(e.target.value)}
                className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
              >
                {membership.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.months} Months – ₹{m.price}
                  </option>
                ))}
              </select>

              <button
                onClick={handleRenewSaveBtn}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
              >
                Save Renewal
              </button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
