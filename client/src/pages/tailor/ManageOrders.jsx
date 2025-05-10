import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box, Eye } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectItem,

} from '@/components/ui/select';

const mockOrders = [
    { id: 1, customerName: 'John Doe', orderDate: '2025-04-25', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', orderDate: '2025-04-26', status: 'In Progress' },
    { id: 3, customerName: 'Usman Ali', orderDate: '2025-04-27', status: 'Completed' },
    { id: 4, customerName: 'Fatima Khan', orderDate: '2025-04-28', status: 'Pending' },
    { id: 5, customerName: 'Ahmed Raza', orderDate: '2025-04-29', status: 'In Progress' },
];

const ManageOrders = () => {
    const [orders, setOrders] = useState(mockOrders);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [filteredOrders, setFilteredOrders] = useState(mockOrders);

    useEffect(() => {
        let filtered = [...orders];

        if (searchQuery) {
            filtered = filtered.filter((order) =>
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'All') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        setFilteredOrders(filtered);
    }, [searchQuery, statusFilter, orders]);

    const updateStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center bg-slate-50 py-10 px-4">
            <div className="w-full max-w-6xl space-y-10">

                {/* Heading and Search */}
                <section className="text-center bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-slate-200">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Manage Orders</h1>
                    <p className="text-lg text-slate-500 mb-4">Track and manage all your orders in one place.</p>
                    <form className="relative max-w-lg mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <Input
                            id="order-search"
                            type="text"
                            placeholder="Search orders by customer name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full !h-12 !pl-11 !pr-28 !rounded-lg !text-base"
                        />
                    </form>
                </section>

                {/* Orders and Filter Section */}
                <section className="pt-6">
                    <Card>
                        <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                            <CardTitle className="flex items-center">
                                <Box size={18} className="mr-2 text-indigo-600" />
                                Orders Overview
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-6">

                                {/* Filter Sidebar */}
                                <div className="w-48">
                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <SelectItem value="All">All Orders</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </Select>
                                </div>
                                {/* Orders Table */}
                                <div className="w-full sm:w-3/4 overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableCell className="font-medium">Order ID</TableCell>
                                                <TableCell>Customer</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {filteredOrders.length > 0 ? (
                                                filteredOrders.map(order => (
                                                    <TableRow key={order.id}>
                                                        <TableCell className="font-medium">#{order.id}</TableCell>
                                                        <TableCell>{order.customerName}</TableCell>
                                                        <TableCell>{order.orderDate}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                className={`!text-sm bg-white border-gray-300 
    ${order.status === 'Completed' ? 'text-green-600' :
                                                                        order.status === 'In Progress' ? 'text-yellow-500' :
                                                                            'text-red-500'}
  `}
                                                                onClick={() => {
                                                                    const newStatus =
                                                                        order.status === 'Pending' ? 'In Progress' :
                                                                            order.status === 'In Progress' ? 'Completed' : 'Pending';
                                                                    updateStatus(order.id, newStatus);
                                                                }}
                                                            >
                                                                {order.status}
                                                            </Button>

                                                        </TableCell>

                                                        <TableCell>
                                                            <Link to={`/orders/${order.id}`}>
                                                                <Button variant="ghost" size="sm" className="hover:bg-gray-100 flex items-center">
                                                                    <Eye className="w-4 h-4 mr-1" />
                                                                    View
                                                                </Button>
                                                            </Link>
                                                        </TableCell>

                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                                        No orders found matching your criteria
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default ManageOrders;