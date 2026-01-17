import React, { useState, useEffect } from "react";
import api from "../../api/axios";

// Material UI
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { toast, ToastContainer } from "react-toastify";

export default function AddMembers() {
  const [InputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "https://openclipart.org/image/800px/247320",
    joiningDate: "",
  });

  const [loaderImage, setLoaderimage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOnChange = (event, name) => {
    setInputField({ ...InputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoaderimage(true);
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgsfifvhy/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      setInputField({ ...InputField, profilePic: result.url });
      setLoaderimage(false);
    } catch (err) {
      console.log(err);
      alert("Image upload failed");
      setLoaderimage(false);
    }
  };

  const fetchMembership = async () => {
    try {
      const response = await api.get("/plans/get-membership");
      setMembershipList(response.data.membership);

      if (response.data.membership.length === 0) {
        return toast.error("No any Membership added yet", {
          className: "text-lg",
        });
      } else {
        let a = response.data.membership[0]._id;
        setSelectedOption(a);
        setInputField({ ...InputField, membership: a });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...InputField, membership: value });
  };

  const handleRegisterButton = async () => {
    try {
      await api.post("/members/register-member", InputField);
      toast.success("Added Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-black p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-lg">
        <input
          value={InputField.name}
          onChange={(e) => handleOnChange(e, "name")}
          className="border-2 w-full px-3 py-2 border-black rounded-md h-12"
          type="text"
          placeholder="Name of the Joinee"
        />

        <input
          value={InputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          className="border-2 w-full px-3 py-2 border-black rounded-md h-12"
          type="text"
          placeholder="Mobile no"
        />

        <input
          value={InputField.address}
          onChange={(e) => handleOnChange(e, "address")}
          className="border-2 w-full px-3 py-2 border-black rounded-md h-12"
          type="text"
          placeholder="Enter Address"
        />

        <input
          value={InputField.joiningDate}
          onChange={(e) => handleOnChange(e, "joiningDate")}
          className="border-2 w-full px-3 py-2 border-black rounded-md h-12"
          type="date"
        />

        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border-2 w-full h-12 px-3 border-black rounded-md"
        >
          {membershipList.map((item, index) => (
            <option key={index} value={item._id}>
              {item.months} Months Membership
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={uploadImage}
          className="border-2 bg-zinc-200 rounded-md w-full px-3 py-2"
        />

        <div className="flex items-center gap-4">
          <div className="w-[100px] h-[100px]">
            <img
              src={InputField.profilePic}
              className="border-2 w-full h-full rounded-full"
            />
          </div>

          {loaderImage && (
            <Stack sx={{ width: "100%", color: "black" }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )}
        </div>

        <div
          onClick={handleRegisterButton}
          className="p-3 border-2 w-full md:w-40 text-lg h-14 text-center bg-black text-white rounded-xl cursor-pointer hover:bg-white hover:text-black flex items-center justify-center"
        >
          Register
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
