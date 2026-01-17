import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MemberCard from "../../components/memberCard/MemberCard.jsx";
import Modal from "../../components/modal/Modal.jsx";
import Addmembership from "../../components/Addmembership/Addmembership.jsx";
import AddMembers from "../../components/AddMembers/AddMembers.jsx";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

      const pages = Math.ceil(response.data.totalMembers / limit);
      setNoOfPage(pages);
    } catch (err) {
      toast.error("Technical Error");
    }
    setLoading(false);
  };

  /* =========================
     PAGINATION HANDLERS
  ========================= */
  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      const newSkip = (newPage - 1) * limit;
      setCurrentpage(newPage);
      setSkip(newSkip);
      fetchData(newSkip, limit);
    }
  };

  const handleNext = () => {
    if (currentPage < noOfPage) {
      const newPage = currentPage + 1;
      const newSkip = (newPage - 1) * limit;
      setCurrentpage(newPage);
      setSkip(newSkip);
      fetchData(newSkip, limit);
    }
  };

  // 🔹 Count calculation
  const startCount = totalData === 0 ? 0 : skip + 1;
  const endCount = skip + data.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-auto">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-500 hover:text-black transition"
            >
              <ChevronLeftIcon /> Back
            </Link>
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
              Members
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setAddmember(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              <AddIcon /> Add Member
            </button>

            <button
              onClick={() => setAddmembership(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              <AddIcon /> Add Membership
            </button>
          </div>
        </div>

        {/* ================= MEMBERS CARD ================= */}
        <section className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
          {loading ? (
            <div className="text-center py-24 text-gray-500">Loading…</div>
          ) : data.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              No Members Found
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((member) => (
                  <MemberCard key={member._id} item={member} />
                ))}
              </div>

              {/* Count Info */}
              <div className="mt-8 text-center text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {startCount}
                </span>{" "}
                –{" "}
                <span className="font-semibold text-gray-800">
                  {endCount}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {totalData}
                </span>{" "}
                members
              </div>

              {/* Pagination */}
              {noOfPage > 1 && (
                <div className="mt-6 flex items-center justify-center gap-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-lg border hover:bg-gray-100 transition disabled:opacity-40"
                  >
                    <ChevronLeftIcon />
                  </button>

                  <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {noOfPage}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={currentPage === noOfPage}
                    className="p-2.5 rounded-lg border hover:bg-gray-100 transition disabled:opacity-40"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <ToastContainer />

        {/* ================= MODALS ================= */}
        {addMember && (
          <Modal
            header="Add Member"
            handleClose={() => setAddmember(false)}
            content={<AddMembers onSuccess={() => fetchData(skip, limit)} />}
          />
        )}

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
