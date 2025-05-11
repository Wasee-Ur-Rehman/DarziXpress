// /pages/customer/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
// ... other imports from lucide-react ...
import { Package, CalendarDays, Clock, CircleCheck, CircleAlert, Truck, CircleDollarSign, ArrowRight } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom'; // Make sure Link is imported

// Helper functions getStatusChipStyles, getStatusIcon remain the same
const getStatusChipStyles = (status) => { /* ... */ };
const getStatusIcon = (status) => { /* ... */ };
// OrderCard component remains mostly the same, but will use `_id` from MongoDB
const OrderCard = ({ order }) => {
    // ... (OrderCard JSX, ensure key is order._id and link uses order._id or order.orderIdString)
    // Example update for link:
    // <Link to={`/customer/order-details/${order._id}`}>
    // For display, you can use order.orderIdString for the user-friendly ID
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    {/* Assuming serviceName is on the first item or you have a primary service name */}
                    <CardTitle className="text-lg leading-tight">{order.items[0]?.serviceName || 'Order Details'}</CardTitle>
                    <div className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusChipStyles(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                    </div>
                </div>
                <CardDescription className="text-xs">
                    Order ID: <span className="font-medium text-slate-700">{order.orderIdString}</span> • By: {order.tailorName}
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
                                {order.status === 'Delivered' && order.actualDeliveryDate ? new Date(order.actualDeliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) :
                                    order.status !== 'Cancelled' && order.estimatedDeliveryDate ? new Date(order.estimatedDeliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <CircleDollarSign size={14} className="mr-2 text-slate-500" />
                    <div>
                        <span className="text-slate-600">Total:</span>
                        <span className="font-semibold ml-1 text-slate-800">PKR {order.totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-slate-50 py-3 px-5">
                <div className="flex justify-between items-center w-full">
                    {order.status === 'Shipped' && order.trackingNumber && (
                        // You might have a link to a carrier or internal tracking page
                        <Button variant="outline" size="sm" onClick={() => alert(`Tracking: ${order.trackingNumber}`)}>Track Order</Button>
                    )}
                    {(order.status !== 'Shipped' || !order.trackingNumber) && <div />}

                    <Link to={`/customer/order-details/${order._id}`}>
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                            View Details <ArrowRight size={14} className="ml-1.5" />
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!authToken) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/orders/my-orders', {
                    headers: { 'Authorization': `Bearer ${authToken}` },
                });
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [authToken]);

    const filteredOrders = orders.filter(order => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'active') return ['Pending Confirmation', 'In Progress', 'Shipped', 'Awaiting Payment'].includes(order.status);
        if (filterStatus === 'past') return ['Delivered', 'Cancelled'].includes(order.status);
        return true;
    }); // Sorting is done by backend now (.sort({ orderDate: -1 }))

    if (loading) return <div className="p-6 text-center">Loading orders...</div>;
    if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-800">Your Orders</h1>
                    <div className="flex space-x-2">
                        {/* ... filter buttons ... */}
                        <Button
                            variant={filterStatus === 'all' ? 'default' : 'outline'} // Changed to default for primary
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterStatus === 'active' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filterStatus === 'past' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('past')}
                        >
                            Past
                        </Button>
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <Card className="text-center py-12">
                        {/* ... no orders display ... */}
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
                            <OrderCard key={order._id} order={order} /> // Use order._id
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;