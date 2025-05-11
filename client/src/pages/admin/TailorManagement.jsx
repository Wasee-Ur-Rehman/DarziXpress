import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const mockTailors = [
  { id: 1, name: 'Rashid Tailor', email: 'rashid@darzi.pk', phone: '0333-1112233' },
  { id: 2, name: 'Sana Designz', email: 'sana@darzi.pk', phone: '0312-4422110' },
];

const TailorManagement = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Manage Tailors</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
          <thead className="bg-slate-100 text-slate-700 text-left text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTailors.map((tailor) => (
              <tr key={tailor.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">{tailor.id}</td>
                <td className="px-4 py-3">{tailor.name}</td>
                <td className="px-4 py-3">{tailor.email}</td>
                <td className="px-4 py-3">{tailor.phone}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TailorManagement;
