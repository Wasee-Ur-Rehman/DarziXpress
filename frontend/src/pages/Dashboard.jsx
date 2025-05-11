import React, { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
  const [pendingTailors, setPendingTailors] = useState([]);
  const [activeTailors, setActiveTailors] = useState([]);
  const [profitData, setProfitData] = useState([]);

  // Fetch pending tailors on component mount
  useEffect(() => {
    fetchPendingTailors();
    fetchActiveTailors();
    fetchProfitData();
  }, []);

  const fetchPendingTailors = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/admin/tailor-requests`
      ); 
      setPendingTailors(res.data);
    } catch (error) {
      console.error("Error fetching pending tailors:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `${baseURL}/admin/tailor-requests/${id}/accept`
      );
      fetchPendingTailors(); 
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(
        `${baseURL}/admin/tailor-requests/${id}/decline`
      );
      fetchPendingTailors(); 
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  const fetchActiveTailors = async () => {
    try {
      // Replace with real API endpoint
      // const response = await axios.get('/api/active-tailors');
      const response = {
        data: [
          { id: 1, name: "Bilal Ahmed", email: "bilal@tailors.com" },
          { id: 2, name: "Nadia Raza", email: "nadia@tailors.com" },
          { id: 3, name: "Hassan Iqbal", email: "hassan@tailors.com" },
        ],
      };
      setActiveTailors(response.data);
    } catch (error) {
      console.error("Error fetching active tailors:", error);
    }
  };
  const fetchProfitData = async () => {
    try {
      // Replace with real API endpoint
      // const response = await axios.get('/api/profit-trend');
      const response = {
        data: [
          { month: "Jan", profit: 2500 },
          { month: "Feb", profit: 3000 },
          { month: "Mar", profit: 4000 },
          { month: "Apr", profit: 3000 },
          { month: "May", profit: 4500 },
        ],
      };
      setProfitData(response.data);
    } catch (error) {
      console.error("Error fetching profit data:", error);
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Overview */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Overview</h3>
        <div className="flex space-x-6">
          <div className="p-6 bg-indigo-100 rounded-lg shadow-md w-1/3 text-center border-2 border-gray-300">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-600">Total Profits</p>
              <h3 className="text-xl font-bold text-indigo-600">$12,500</h3>
            </div>
          </div>

          <div className="p-6 bg-yellow-100 rounded-lg shadow-md w-1/3 text-center border-2 border-gray-300">
            <div className="bg-gray-200 p-4 rounded-xl">
              <p className="text-gray-600">Pending Tailor Requests</p>
              <h3 className="text-xl font-bold text-yellow-600">
                {pendingTailors.length}
              </h3>
            </div>
          </div>

          <div className="p-6 bg-red-100 rounded-lg shadow-md w-1/3 text-center border-2 border-gray-300">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-600">Disabled Tailors</p>
              <h3 className="text-xl font-bold text-red-600">2</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tailor Requests */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Tailor Account Requests</h2>
        <div className="space-y-4">
          {pendingTailors.length === 0 ? (
            <p className="text-gray-500">No pending requests</p>
          ) : (
            pendingTailors.map((tailor) => (
              <div
                key={tailor._id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow"
              >
                <div>
                  <p className="font-medium">{tailor.name}</p>
                  <p className="text-sm text-gray-600">{tailor.email}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleAccept(tailor._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(tailor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* Active Tailors */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Active Tailors</h3>
        <div className="space-y-4">
          {activeTailors.map((tailor) => (
            <div
              key={tailor.id}
              className="flex items-center justify-between bg-green-50 p-4 rounded-md shadow"
            >
              <div>
                <p className="font-medium">{tailor.name}</p>
                <p className="text-sm text-gray-600">{tailor.email}</p>
              </div>
              <span className="text-sm text-green-600 font-semibold">
                Active
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Profit Chart */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Profit Trend</h3>
      </section>
    </div>
  );
};

export default Dashboard;