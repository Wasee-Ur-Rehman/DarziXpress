import React from 'react';
import { Users, Ruler, Wallet, LineChart, BarChart } from 'lucide-react';
import { ResponsiveContainer, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as ReLineChart, BarChart as ReBarChart } from 'recharts';

const AdminDashboard = () => {
  // Simulated data (in real case, fetch from API)
  const totalTailors = 12;
  const totalCustomers = 48;
  const completedOrders = 360;
  const earnings = completedOrders * 5;

  const ordersData = [
    { month: 'Jan', orders: 20 },
    { month: 'Feb', orders: 50 },
    { month: 'Mar', orders: 90 },
    { month: 'Apr', orders: 80 },
    { month: 'May', orders: 120 },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex items-center gap-4">
          <Users className="text-indigo-600" size={36} />
          <div>
            <p className="text-sm text-slate-500">Total Customers</p>
            <h2 className="text-2xl font-bold text-slate-800">{totalCustomers}</h2>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex items-center gap-4">
          <Ruler className="text-indigo-600" size={36} />
          <div>
            <p className="text-sm text-slate-500">Total Tailors</p>
            <h2 className="text-2xl font-bold text-slate-800">{totalTailors}</h2>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm flex items-center gap-4">
          <Wallet className="text-green-600" size={36} />
          <div>
            <p className="text-sm text-slate-500">Total Earnings</p>
            <h2 className="text-2xl font-bold text-slate-800">Rs.{earnings}</h2>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <LineChart className="text-indigo-600" size={20} /> Orders Per Month
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <ReLineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart className="text-indigo-600" size={20} /> Earnings Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#10b981" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
