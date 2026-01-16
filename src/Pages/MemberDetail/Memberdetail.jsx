import React, { useState, useEffect } from "react";

// Switch
import Switch from "react-switch";

// Icons & Router
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";

// API & Toast
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Memberdetail() {
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const { id } = useParams();
  const [planMember, setPlanMember] = useState("");

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((response) => {
        setMembership(response.data.membership);
        setPlanMember(response.data.membership[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:4000/members/get-member/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.member);
        setStatus(response.data.member.status);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  const handleSwitchBtn = async () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    await axios
      .post(
        `http://localhost:4000/members/change-status/${id}`,
        { status: statuss },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Status Changed ");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });

    setStatus(statuss);
  };

  const isDateInPast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < today;
  };

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setPlanMember(value);
  };

  const handleRenewSaveBtn = async () => {
    await axios
      .put(
        `http://localhost:4000/members/update-member-plan/${id}`,
        { membership: planMember },
        { withCredentials: true }
      )
      .then((response) => {
        setData(response.data.member);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="flex-1 text-black p-4 sm:p-6 md:p-10">
      {/* Back Button */}
      <div
        onClick={() => navigate(-1)}
        className="border-2 w-fit px-3 py-1 rounded-2xl cursor-pointer 
                   hover:bg-black hover:text-white transition"
      >
        <ChevronLeftIcon /> Back
      </div>

      {/* Content */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={data?.profilePic}
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-xl border"
              alt="profile"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 text-base sm:text-lg md:text-xl p-2 sm:p-5">
            <div className="mb-2 font-semibold">
              Name : {data?.name}
            </div>
            <div className="mb-2 font-semibold">
              Mobile : {data?.mobileNo}
            </div>
            <div className="mb-2 font-semibold">
              Address : {data?.address}
            </div>
            <div className="mb-2 font-semibold">
              Joined Date :{" "}
              {data?.createdAt
                ? data.createdAt
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")
                : "N/A"}
            </div>

            <div className="mb-2 font-semibold">
              Next Bill Date :{" "}
              {data?.nextBillDate
                ?.slice(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </div>

            <div className="mb-4 flex items-center gap-4 font-semibold">
              Status :
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={handleSwitchBtn}
              />
            </div>

            {/* Renew Button */}
            {isDateInPast(data?.nextBillDate) && (
              <div
                className={`mt-2 rounded-lg p-3 border-2 border-black 
                text-center w-full sm:w-1/2 cursor-pointer
                hover:bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500
                ${renew && status === "Active"
                  ? "bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500"
                  : ""}`}
                onClick={() => setRenew((prev) => !prev)}
              >
                Renew
              </div>
            )}

            {/* Renew Section */}
            {renew && status === "Active" && (
              <div className="rounded-lg p-4 mt-5 bg-zinc-50 w-full">
                <div className="my-4">
                  <div className="mb-2 font-medium">Membership</div>
                  <select
                    value={planMember}
                    onChange={handleOnChangeSelect}
                    className="w-full border-2 p-2 rounded-lg"
                  >
                    {membership.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.months} Months Membership
                      </option>
                    ))}
                  </select>

                  <div
                    className="mt-4 rounded-lg p-3 border-2 border-white 
                               text-center w-full sm:w-1/2 mx-auto 
                               cursor-pointer hover:bg-gradient-to-r 
                               from-zinc-500 via-zinc-200 to-zinc-500"
                    onClick={handleRenewSaveBtn}
                  >
                    Save
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
