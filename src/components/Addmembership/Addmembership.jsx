import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";

export default function Addmembership({ handleClose }) {
  const [InputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...InputField, [name]: event.target.value });
  };

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
    <div className="text-black p-4">
      {/* Membership Cards */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {membership.map((item, index) => (
          <div
            key={index}
            className="text-lg bg-zinc-900 text-white border-2 px-4 py-3 flex flex-col gap-2 rounded-xl font-semibold hover:bg-white hover:text-black w-full sm:w-[200px] text-center"
          >
            <div>{item.months} Months Membership</div>
            <div>Rs {item.price}</div>
          </div>
        ))}
      </div>

      <hr className="my-10" />

      {/* Add Membership Form */}
      <div className="flex flex-col md:flex-row gap-5 items-center justify-center mb-10">
        <input
          value={InputField.months}
          onChange={(e) => handleOnChange(e, "months")}
          className="border-2 rounded-lg text-lg w-full md:w-1/3 p-2"
          type="number"
          placeholder="Add No. of Months"
        />

        <input
          value={InputField.price}
          onChange={(e) => handleOnChange(e, "price")}
          className="border-2 rounded-lg text-lg w-full md:w-1/3 p-2"
          type="number"
          placeholder="Add Price"
        />

        <div
          onClick={handleAddmembership}
          className="text-lg border-2 bg-black text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white hover:text-black"
        >
          Add +
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
