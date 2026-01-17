import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MemberCard from "../../components/memberCard/MemberCard.jsx";
import Modal from "../../components/modal/Modal.jsx";
import Addmembership from "../../components/Addmembership/Addmembership.jsx";
import AddMembers from "../../components/AddMembers/AddMembers.jsx";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";

import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

export default function Member() {
  // 🔹 Modal states
  const [addMembership, setAddmembership] = useState(false);
  const [addMember, setAddmember] = useState(false);

  // 🔹 Pagination & data
  const [currentPage, setCurrentpage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [limit] = useState(9);
  const [noOfPage, setNoOfPage] = useState(0);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);

  // 🔹 UI states
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(0, limit);
  }, []);

  const fetchData = async (skipValue, limits) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/members/all-member?skip=${skipValue}&limit=${limits}`
      );

      setTotalData(response.data.totalMembers);
      setData(response.data.members);

      const pages =
        response.data.totalMembers % limit === 0
          ? response.data.totalMembers / limit
          : Math.floor(response.data.totalMembers / limit) + 1;
      setNoOfPage(pages);
    } catch (err) {
      toast.error("Technical Error");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-500 hover:text-black"
            >
              <ChevronLeftIcon /> Back
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
              Members
            </h1>
          </div>

          {/* ✅ ACTION BUTTONS (THIS WAS MISSING) */}
          <div className="flex gap-3">
            <button
              onClick={() => setAddmember(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              <AddIcon /> Add Member
            </button>

            <button
              onClick={() => setAddmembership(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800"
            >
              <AddIcon /> Add Membership
            </button>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 min-h-[60vh]">
          {loading ? (
            <div className="text-center py-20">Loading…</div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No Members Found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((member) => (
                <MemberCard key={member._id} item={member} />
              ))}
            </div>
          )}
        </div>

        {/* Toast */}
        <ToastContainer />

        {/* ✅ ADD MEMBER MODAL */}
        {addMember && (
          <Modal
            header="Add Member"
            handleClose={() => setAddmember(false)}
            content={<AddMembers />}
          />
        )}

        {/* ✅ ADD MEMBERSHIP MODAL */}
        {addMembership && (
          <Modal
            header="Add Membership"
            handleClose={() => setAddmembership(false)}
            content={
              <Addmembership handleClose={() => setAddmembership(false)} />
            }
          />
        )}
      </main>
    </div>
  );
}
