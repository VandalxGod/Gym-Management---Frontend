import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

export default function Addmembership({ handleClose }) {
  const [InputField, setInputField] = useState({
    months: "",
    price: "",
  });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...InputField, [name]: event.target.value });
  };

  /* ================= FETCH MEMBERSHIP ================= */
  const fetchMembership = async () => {
    try {
      const res = await api.get("/plans/get-membership");
      setMembership(res.data.membership);
      toast.success(res.data.membership.length + " Membership Fetched");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  /* ================= ADD MEMBERSHIP ================= */
  const handleAddmembership = async () => {
    try {
      const res = await api.post("/plans/add-membership", InputField);
      toast.success(res.data.message);
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-black p-4 sm:p-6 md:p-8 max-h-[85vh] overflow-y-auto pb-12">
      {/* ================= MEMBERSHIP CARDS ================= */}
      <div className="flex flex-wrap gap-6 items-stretch justify-center">
        {membership.map((item, index) => (
          <div
            key={index}
            className="
              text-base sm:text-lg
              bg-zinc-900 text-white
              border-2
              px-5 py-4
              flex flex-col gap-2
              rounded-2xl font-semibold
              hover:bg-white hover:text-black
              w-full sm:w-[220px]
              min-h-[110px]
              text-center
              break-words
            "
          >
            <div className="leading-snug">
              {item.months} Months Membership
            </div>
            <div className="leading-snug">
              Rs {item.price}
            </div>
          </div>
        ))}
      </div>

      <hr className="my-10" />

      {/* ================= ADD MEMBERSHIP FORM ================= */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-end justify-center mb-18">
        <input
          value={InputField.months}
          onChange={(e) => handleOnChange(e, "months")}
          className="
            border-2 rounded-xl
            text-base sm:text-lg
            w-full md:w-1/3
            px-4 py-3
          "
          type="number"
          placeholder="Add No. of Months"
        />

        <input
          value={InputField.price}
          onChange={(e) => handleOnChange(e, "price")}
          className="
            border-2 rounded-xl
            text-base sm:text-lg
            w-full md:w-1/3
            px-4 py-3
          "
          type="number"
          placeholder="Add Price"
        />

        <div
          onClick={handleAddmembership}
          className="
            text-base sm:text-lg
            border-2 bg-black text-white
            px-8 py-3
            rounded-xl
            cursor-pointer
            hover:bg-white hover:text-black
            text-center
            w-full md:w-auto
          "
        >
          Add +
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
