// /pages/customer/CustomerDashboard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Activity, Ruler as RulerIcon } from 'lucide-react';

// Corrected imports for Card and its parts
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Import parts
import { Button } from '@/components/ui/button';


// Mock data - replace with actual data
const mockMeasurements = [
    { id: 1, name: 'Formal Shirt Profile', lastUpdated: '2023-10-15' },
    { id: 2, name: 'Casual Trousers', lastUpdated: '2023-09-20' },
];
const userName = "Ayesha Khan";

const CustomerDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Ensure this route exists and matches your ServiceListingPage
            navigate(`/customer/listing?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start bg-slate-50 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl space-y-10">

                <section className="text-center bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-slate-200">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                        Find Your Perfect Stitching Service
                    </h1>
                    <p className="text-slate-500 mb-6 text-sm sm:text-base">
                        Search for services like "pant coat stitching", "bridal lehenga", or "kurta design".
                    </p>
                    <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <Input
                            id="service-search" // Good for accessibility with Label if you add one
                            type="text"
                            placeholder="E.g., 'Pant Coat Stitching'..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full !h-12 !pl-11 !pr-28 !rounded-lg !text-base" // pr-28 for button space
                        />
                        <Button
                            type="submit"
                            className="!absolute !inset-y-1.5 !right-1.5 !h-auto !px-5 !py-2" // Adjusted for better fit
                        >
                            Search
                        </Button>
                    </form>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center sm:text-left">
                        Welcome back, <span className="text-indigo-600">{userName}!</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> {/* Standard shadcn/ui CardHeader styling */}
                                <CardTitle className="flex items-center"> {/* CardTitle default is text-sm font-medium based on my simplified version */}
                                    <RulerIcon size={16} className="mr-2 text-indigo-500" />
                                    My Measurements
                                </CardTitle>
                                <Link to="/customer/measurements">
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
                                    <p className="text-sm text-slate-500">No measurement profiles found.</p>
                                )}
                                {mockMeasurements.length > 2 &&
                                    <p
                                        className="text-xs text-indigo-600 hover:underline mt-2 text-center cursor-pointer"
                                        onClick={() => navigate('/customer/measurements')}
                                    >
                                        View all {mockMeasurements.length} profiles
                                    </p>
                                }
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="flex items-center">
                                    <Activity size={16} className="mr-2 text-green-500" />
                                    Recent Activity
                                </CardTitle>
                                <Link to="/customer/orders">
                                    <Button variant="ghost" size="sm" className="-mr-2 h-8">View Orders</Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600">
                                    You have <Link to="/customer/orders?status=active" className="font-semibold text-indigo-600 hover:underline">2 active orders</Link>.
                                </p>
                                <p className="text-sm text-slate-500 mt-1">Your last completed order was on Nov 10, 2023.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CustomerDashboard;