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

  const fetchMembership = async () => {
    try {
      const response = await api.get("/plans/get-membership");
      setMembership(response.data.membership);
      setPlanMember(response.data.membership[0]._id);
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/members/get-member/${id}`);
      setData(response.data.member);
      setStatus(response.data.member.status);
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  const handleSwitchBtn = async () => {
    const statuss = status === "Active" ? "Pending" : "Active";
    await api.post(`/members/change-status/${id}`, { status: statuss });
    setStatus(statuss);
    toast.success("Status Changed");
  };

  const handleRenewSaveBtn = async () => {
    const response = await api.put(`/members/update-member-plan/${id}`, {
      membership: planMember,
    });
    setData(response.data.member);
    toast.success(response.data.message);
  };

  return (
    <div className="flex-1 text-black p-4 sm:p-6 md:p-10">
      <div onClick={() => navigate(-1)} className="border-2 w-fit px-3 py-1 rounded-2xl cursor-pointer hover:bg-black hover:text-white">
        <ChevronLeftIcon /> Back
      </div>

      <ToastContainer />
    </div>
  );
}
