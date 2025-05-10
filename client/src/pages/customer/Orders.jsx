// /pages/customer/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, CalendarDays, Clock, CircleCheck, CircleAlert, Truck, CircleDollarSign, ArrowRight } from 'lucide-react';

// Import your simplified UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Select } from '@/components/ui/select'; // For potential filtering
// import { Input } from '@/components/ui/input'; // For potential search

// Mock Order Data
const mockOrdersData = [
    {
        id: 'ORD78923A',
        serviceName: 'Custom Blue 3-Piece Suit',
        tailorName: 'Ahmad Custom Wear',
        orderDate: '2024-03-01',
        estimatedDelivery: '2024-03-20',
        status: 'In Progress', // 'In Progress', 'Shipped', 'Delivered', 'Cancelled'
        price: 12500,
        trackingLink: '#', // Placeholder
        items: [
            { name: 'Suit Jacket', qty: 1 },
            { name: 'Suit Trousers', qty: 1 },
            { name: 'Waistcoat', qty: 1 },
        ]
    },
    {
        id: 'ORD65487B',
        serviceName: 'Bridal Lehenga Alteration',
        tailorName: 'Sara Boutique',
        orderDate: '2024-02-15',
        estimatedDelivery: '2024-02-25',
        status: 'Delivered',
        price: 3500,
        deliveryDate: '2024-02-24',
        items: [
            { name: 'Lehenga Skirt Alteration', qty: 1 },
            { name: 'Blouse Fitting', qty: 1 },
        ]
    },
    {
        id: 'ORD12345C',
        serviceName: 'Summer Kurta Set (3 Nos.)',
        tailorName: 'Modern Stitches',
        orderDate: '2024-03-05',
        estimatedDelivery: '2024-03-15',
        status: 'Shipped',
        price: 10500,
        trackingLink: '#',
        items: [
            { name: 'Cotton Kurta - Blue', qty: 1 },
            { name: 'Cotton Kurta - White', qty: 1 },
            { name: 'Cotton Kurta - Green', qty: 1 },
        ]
    },
    {
        id: 'ORD007XFE',
        serviceName: 'Office Shirt Stitching (2 Pcs)',
        tailorName: 'The Perfect Fit',
        orderDate: '2024-01-10',
        estimatedDelivery: '2024-01-20',
        status: 'Cancelled',
        price: 4000,
        items: [
            { name: 'Formal Shirt - White', qty: 1 },
            { name: 'Formal Shirt - Light Blue', qty: 1 },
        ]
    },
];

const getStatusChipStyles = (status) => {
    switch (status) {
        case 'In Progress':
            return 'bg-amber-100 text-amber-700 border-amber-200';
        case 'Shipped':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'Delivered':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'Cancelled':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-slate-100 text-slate-700 border-slate-200';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'In Progress':
            return <Clock size={14} className="mr-1.5 text-amber-600" />;
        case 'Shipped':
            return <Truck size={14} className="mr-1.5 text-blue-600" />;
        case 'Delivered':
            return <CircleCheck size={14} className="mr-1.5 text-green-600" />;
        case 'Cancelled':
            return <CircleAlert size={14} className="mr-1.5 text-red-600" />;
        default:
            return null;
    }
};

const OrderCard = ({ order }) => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <CardTitle className="text-lg leading-tight">{order.serviceName}</CardTitle>
                    <div className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusChipStyles(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                    </div>
                </div>
                <CardDescription className="text-xs">
                    Order ID: <span className="font-medium text-slate-700">{order.id}</span> • By: {order.tailorName}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                        <CalendarDays size={14} className="mr-2 text-slate-500" />
                        <div>
                            <span className="text-slate-600">Ordered:</span>
                            <span className="font-medium ml-1 text-slate-800">{new Date(order.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {order.status !== 'Delivered' && order.status !== 'Cancelled' && <Clock size={14} className="mr-2 text-slate-500" />}
                        {order.status === 'Delivered' && <CircleCheck size={14} className="mr-2 text-green-600" />}
                        {order.status === 'Cancelled' && <CircleAlert size={14} className="mr-2 text-red-600" />}
                        <div>
                            <span className="text-slate-600">
                                {order.status === 'Delivered' ? 'Delivered:' : order.status === 'Cancelled' ? 'Cancelled on:' : 'Est. Delivery:'}
                            </span>
                            <span className="font-medium ml-1 text-slate-800">
                                {order.status === 'Delivered' && order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) :
                                    order.status !== 'Cancelled' ? new Date(order.estimatedDelivery).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <CircleDollarSign size={14} className="mr-2 text-slate-500" />
                    <div>
                        <span className="text-slate-600">Total:</span>
                        <span className="font-semibold ml-1 text-slate-800">PKR {order.price.toLocaleString()}</span>
                    </div>
                </div>
                {/* Placeholder for items summary */}
                {/* <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
                    Items: {order.items.map(item => `${item.name} (Qty: ${item.qty})`).join(', ')}
                </p> */}
            </CardContent>
            <CardFooter className="bg-slate-50 py-3 px-5">
                <div className="flex justify-between items-center w-full">
                    {order.status === 'Shipped' && order.trackingLink && (
                        <a href={order.trackingLink} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">Track Order</Button>
                        </a>
                    )}
                    {order.status !== 'Shipped' && <div />} {/* Placeholder to keep alignment */}

                    <Link to={`/customer/order-details/${order.id}`}> {/* Adjust route */}
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                            View Details <ArrowRight size={14} className="ml-1.5" />
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'past'

    useEffect(() => {
        // In a real app, fetch orders from an API
        setOrders(mockOrdersData);
    }, []);

    const filteredOrders = orders.filter(order => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'active') return ['In Progress', 'Shipped'].includes(order.status);
        if (filterStatus === 'past') return ['Delivered', 'Cancelled'].includes(order.status);
        return true;
    }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)); // Sort by most recent first

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">Your Orders</h1>
                    {/* Basic Filter Buttons - Can be replaced with Select component */}
                    <div className="flex space-x-2">
                        <Button
                            variant={filterStatus === 'all' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterStatus === 'active' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filterStatus === 'past' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('past')}
                        >
                            Past
                        </Button>
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Package size={48} className="mx-auto text-slate-400 mb-4" />
                            <p className="text-xl font-semibold text-slate-700">No Orders Found</p>
                            <p className="text-slate-500 mt-1">
                                {filterStatus === 'all' ? "You haven't placed any orders yet." : `You have no ${filterStatus} orders.`}
                            </p>
                            {filterStatus !== 'all' && (
                                <Button variant="link" onClick={() => setFilterStatus('all')} className="mt-2">
                                    View All Orders
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;