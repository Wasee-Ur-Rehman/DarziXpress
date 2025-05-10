import React, { useState } from 'react';
import { Currency } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectItem } from '@/components/ui/Select'; // Using native version
import { Badge } from '@/components/ui/badge';

const dummyOrders = [
  { title: "Men's Suit Stitching", price: 8500, date: '2025-05-05', status: 'Completed' },
  { title: 'Bridal Dress', price: 20000, date: '2025-04-20', status: 'Completed' },
  { title: 'Casual Shirt', price: 2500, date: '2025-04-15', status: 'Completed' },
  { title: 'Party Dress', price: 2500, date: '2025-01-10', status: 'Pending' },
];

const MyEarnings = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All Time');

  const isWithinTimeRange = (orderDate) => {
    const now = new Date();
    const order = new Date(orderDate);
    const diffInMs = now - order;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    switch (timeFilter) {
      case 'This Week':
        return diffInDays <= 7;
      case 'This Month':
        return (
          order.getMonth() === now.getMonth() &&
          order.getFullYear() === now.getFullYear()
        );
      case 'This Year':
        return order.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  };

  const filteredOrders = dummyOrders.filter((order) => {
    const statusMatches = statusFilter === 'All' || order.status === statusFilter;
    const timeMatches = isWithinTimeRange(order.date);
    return statusMatches && timeMatches;
  });

  const getTotal = () =>
    filteredOrders.reduce(
      (sum, order) => (order.status === 'Completed' ? sum + order.price : sum),
      0
    );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Earnings Dashboard</h1>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Currency className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {getTotal()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
<div className="flex justify-end">
           
        <div className="w-48">
          <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <SelectItem value="All Time">All Time</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </Select>
        </div>
      </div>

      {/* Order History Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Title</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.title}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>Rs {order.price}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Completed' ? 'success' : 'destructive'}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyEarnings;
