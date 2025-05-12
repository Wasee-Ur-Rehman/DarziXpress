// /pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
// import axios from "axios"; // Using fetch instead for consistency
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { DollarSign, Users, UserCheck, TrendingUp, Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Keep for retry button
import { useAuth } from "@/context/AuthContext"; // Assuming admin uses AuthContext

import { useNavigate } from "react-router-dom";
// Register Chart.js components (already present)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const baseURL = import.meta.env.VITE_API_BASE_URL || ''; // Ensure baseURL is defined

const formatCurrency = (amount, currency = "PKR") => { /* ... same ... */ };
const StatCard = ({ title, value, icon, unit = "", color = "text-indigo-600", isLoading }) => ( // Added isLoading back
  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex-1 min-w-[200px]">
    <div className="flex items-center justify-between mb-1">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      {icon && React.cloneElement(icon, { className: `h-5 w-5 text-slate-400` })}
    </div>
    {isLoading ? (
      <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse mt-1"></div>
    ) : (
      <h3 className={`text-3xl font-bold ${color}`}>{unit}{value !== null && value !== undefined ? value.toLocaleString() : 'N/A'}</h3>
    )}
  </div>
);

const AdminDashboard = () => {
  const { authToken, user, authLoading, logout } = useAuth(); // Use admin's auth token
  const navigate = useNavigate(); // If needed for redirection on auth failure

  const [overviewStats, setOverviewStats] = useState({
    totalPlatformProfit: null, totalCustomers: null, totalTailors: null,
  });
  const [earningsTrend, setEarningsTrend] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return; // Wait for AuthContext to be ready

    if (!authToken || !user || user.userType !== 'admin') {
      setError("Access Denied. Please log in as an Admin.");
      setLoadingStats(false);
      setLoadingChart(false);
      // Optional: redirect to login
      // logout(); navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      setLoadingStats(true); setLoadingChart(true); setError('');
      try {
        const [statsResponse, earningsResponse] = await Promise.all([
          fetch(`${baseURL}/api/admin/stats/overview`, { headers: { 'Authorization': `Bearer ${authToken}` } }),
          fetch(`${baseURL}/api/admin/stats/earnings-trend`, { headers: { 'Authorization': `Bearer ${authToken}` } })
        ]);

        // Process Overview Stats
        if (!statsResponse.ok) {
          const errData = await statsResponse.json().catch(() => ({ message: "Failed to fetch overview stats" }));
          throw new Error(`Stats Error: ${statsResponse.status} - ${errData.message}`);
        }
        const statsData = await statsResponse.json();
        setOverviewStats({
          totalPlatformProfit: statsData.totalPlatformProfit ?? 0,
          totalCustomers: statsData.totalCustomers ?? 0,
          totalTailors: statsData.totalTailors ?? 0,
        });

        // Process Earnings Trend
        if (!earningsResponse.ok) {
          const errData = await earningsResponse.json().catch(() => ({ message: "Failed to fetch earnings trend" }));
          throw new Error(`Earnings Trend Error: ${earningsResponse.status} - ${errData.message}`);
        }
        const earningsData = await earningsResponse.json();
        setEarningsTrend(earningsData || []);

      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoadingStats(false);
        setLoadingChart(false);
      }
    };

    fetchDashboardData();
  }, [authToken, user, authLoading, logout, navigate]); // Added dependencies

  const earningsChartData = { /* ... same ... */ };
  const chartOptions = { /* ... same ... */ };
  // ... (Chart data and options remain the same as your provided code)

  // Loading and Error States for the whole page
  if (authLoading) {
    return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin" /> <p className="ml-3">Initializing Admin Session...</p></div>;
  }
  if (error && !overviewStats.totalCustomers && !overviewStats.totalTailors) { // Show critical error if initial stats load failed
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-100 p-8 text-center">
        <AlertTriangle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-700">Error Loading Dashboard</h2>
        <p className="text-red-600 mt-1 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      <header className="mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Admin Dashboard</h1>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            title="Total Platform Profit"
            value={overviewStats.totalPlatformProfit}
            icon={<DollarSign />}
            unit="PKR "
            color="text-green-600"
            isLoading={loadingStats}
          />
          <StatCard
            title="Total Customers"
            value={overviewStats.totalCustomers}
            icon={<Users />}
            isLoading={loadingStats}
          />
          <StatCard
            title="Total Tailors"
            value={overviewStats.totalTailors}
            icon={<UserCheck />}
            isLoading={loadingStats}
          />
        </div>
      </section>

      <section className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-semibold text-slate-700">Earnings Trend</h3>
        <CardDescription className="text-sm text-slate-500 mb-6">
          Monthly platform profit from service commissions.
        </CardDescription>
        {loadingChart ? (
          <div className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            <p className="ml-3 text-slate-500">Loading chart data...</p>
          </div>
        ) : error && earningsTrend.length === 0 ? (
          <div className="h-80 flex flex-col items-center justify-center bg-red-50 text-red-600 p-4 rounded-md">
            <AlertTriangle size={32} className="mb-2" />
            <p>Could not load earnings trend data.</p>
            {/* <p className="text-xs mt-1">{error}</p> */} {/* Error is already displayed globally if critical */}
          </div>
        ) : earningsTrend.length === 0 ? (
          <div className="h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 p-4 rounded-md">
            <TrendingUp size={32} className="mb-2" />
            <p>No earnings data available to display trend yet.</p>
          </div>
        ) : (
          <div className="relative h-80 md:h-96">
            <Bar options={chartOptions} data={earningsChartData} />
          </div>
        )}
      </section>
      {/* Display global error if any fetch failed but some data might have loaded */}
      {error && (!loadingStats || !loadingChart) && (overviewStats.totalCustomers !== null || earningsTrend.length > 0) && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md text-center">
          <p>There was an issue loading some dashboard components: {error}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;