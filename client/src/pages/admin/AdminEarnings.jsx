import React, { useState } from 'react';

const mockEarnings = [
  {
    id: 'ORD-001',
    date: '2025-05-01',
    tailor: 'Aamir Tailor',
    customer: 'Ali Khan',
    description: '2-piece stitched with neckline embroidery',
    price: 1200,
    status: 'Completed'
  },
  {
    id: 'ORD-002',
    date: '2025-05-03',
    tailor: 'Zara Tailors',
    customer: 'Sana Sheikh',
    description: 'Kurti with hand embroidery',
    price: 1800,
    status: 'Completed'
  },
  {
    id: 'ORD-003',
    date: '2025-05-05',
    tailor: 'Ali Tailor',
    customer: 'Zahid Mehmood',
    description: 'Shalwar Kameez - 3 piece full stitch',
    price: 1500,
    status: 'Completed'
  }
];

const AdminEarnings = () => {
  const [sortOrder, setSortOrder] = useState('newest');

  const sortedEarnings = [...mockEarnings].sort((a, b) => {
    return sortOrder === 'newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const totalEarnings = mockEarnings.length * 5;

  return (
    <div className="min-h-screen px-6 py-10 bg-[#f9fafb]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Earnings Summary</h1>
          <p className="text-slate-500 mt-1">You earn Rs.5 per completed order.</p>
          <div className="mt-2 text-lg font-semibold text-green-700">
            Total Earnings: Rs.{totalEarnings}
          </div>
        </div>

        {/* Sorting Filter */}
        <div>
          <label className="block text-sm text-slate-600 mb-1">Sort By</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEarnings.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="text-sm text-slate-400">{entry.date}</div>
            <h2 className="text-lg font-semibold text-slate-800 mt-1">{entry.description}</h2>
            <div className="mt-3 text-sm space-y-1">
              <p><span className="font-medium text-slate-600">Order ID:</span> {entry.id}</p>
              <p><span className="font-medium text-slate-600">Tailor:</span> {entry.tailor}</p>
              <p><span className="font-medium text-slate-600">Customer:</span> {entry.customer}</p>
              <p><span className="font-medium text-slate-600">Order Price:</span> Rs.{entry.price}</p>
              <p><span className="font-medium text-slate-600">Status:</span> {entry.status}</p>
            </div>
            <div className="mt-4 text-right text-green-600 font-semibold">
              You Earned: Rs.5
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEarnings;
