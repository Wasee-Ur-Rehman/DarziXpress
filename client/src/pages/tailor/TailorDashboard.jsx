import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Activity, Info, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockOrders = 5;
const mockMeasurements = [
  { id: 1, name: "3-Piece Bridal Dress", lastUpdated: "2025-04-25" },
  { id: 2, name: "Men's Formal Suit", lastUpdated: "2025-04-18" },
];
const lastOrderDate = "Apr 28, 2025";
const tailorName = "Usman Ali";

const TailorDashboard = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start bg-slate-50 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-10">

        {/* Tailor Name */}
        <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center sm:text-left">Welcome back, 
            <span className="text-indigo-600">{tailorName}!</span>
        </h2>
        <p className="text-lg text-gray-600">
          Manage your stitching services, track orders, and view measurements.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
          {/* Orders Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center">
                <Activity size={16} className="mr-2 text-green-500" />
                Orders Overview
              </CardTitle>
              <Link to="/tailor/orders">
                <Button variant="ghost" size="sm" className="-mr-2 h-8">View Orders</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                You have <span className="font-semibold text-indigo-600">{mockOrders} active orders</span>.
              </p>
              <p className="text-sm text-slate-500 mt-1">Last completed order: {lastOrderDate}</p>
            </CardContent>
          </Card>

          {/* Measurements Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center">
                <Ruler size={16} className="mr-2 text-indigo-500" />
                Recent Measurements
              </CardTitle>
              <Link to="/tailor/measurements">
                <Button variant="ghost" size="sm" className="-mr-2 h-8">Manage</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {mockMeasurements.length > 0 ? (
                <ul className="space-y-2">
                  {mockMeasurements.slice(0, 2).map(m => (
                    <li key={m.id} className="text-sm text-slate-600 flex justify-between items-center p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
                      <span>{m.name}</span>
                      <span className="text-xs text-slate-400">Updated: {m.lastUpdated}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">No measurements recorded yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Post Your Service Card */}
   <Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="flex items-center">
      <PlusCircle size={16} className="mr-2 text-indigo-600" />
      List Your Service
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-slate-600 mb-3">
      Make your service visible to customers by posting details about what you offer.
    </p>
    <Button
      onClick={() => navigate('/tailor/post-service')}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
    >
      Post Your Service
    </Button>
  </CardContent>
</Card>
        {/* Tips Card */}
        <Card>
          <CardHeader className="flex items-center space-y-0 pb-2">
            <CardTitle className="flex items-center">
              <Info size={16} className="mr-2 text-yellow-500" />
              Tailor Tips & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
              <li>Keep your price listings updated for better customer visibility.</li>
              <li>Complete measurements with full details to avoid order issues.</li>
              <li>Respond to new order requests within 12–24 hours.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TailorDashboard;
