import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "@/assets/images/ManageProfile.png";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ManageProfile = () => {
  const [admin, setAdmin] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/admin/profile`)
      .then((res) => {
        setAdmin({ ...res.data, password: "" });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch admin profile:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`${baseURL}/admin/profile`, admin);
      setMessage(res.data.message);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="min-h-screen flex justify-start items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="max-w-[500px] w-full p-6 bg-white bg-opacity-80 shadow rounded mt-32 ml-32 align-center mb-32"
        // style={{
        //   marginLeft: "4rem",
        //   alignContent: "center",
        //   width: "100vw",
        //   height: "100vh",
        // }}
      >
        <h1 className="text-2xl font-semibold mb-4 text-black text-center">
          Manage Admin Profile
        </h1>
        {["Full Name", "Email", "Phone Number", "City", "Password"].map(
          (field) => (
            <div key={field} className="mb-6 justify-left flex items-center">
              <label
                className="max-w-full block mb-2 capitalize text-center text-black"
                style={{ height: "20px" }}
              >
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={admin[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="flex-1 border px-6 py-6 rounded text-white bg-gray-800"
                style={{
                  marginLeft: "1rem",
                  height: "30px",
                  width: "300px",
                  alignContent: "flex-start",
                  alignItems: "center",
                }}
              />
            </div>
          )
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          style={{
            backgroundColor: "#5a67d8",
            color: "white",
            height: "40px",
            marginTop: "10px",
          }}
        >
          Update Profile
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ManageProfile;
