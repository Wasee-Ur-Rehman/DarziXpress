import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `/api/orders/summary?status=${status}`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [status]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>

      {/* Dropdown to filter orders by status */}
      <div className="mb-4">
        <label className="text-lg font-semibold mr-2">Filter by Status:</label>
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table displaying the orders */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Order ID</th>
              <th className="px-4 py-2 text-left border-b">Customer</th>
              <th className="px-4 py-2 text-left border-b">Tailor</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">Total Amount</th>
              <th className="px-4 py-2 text-left border-b">Order Date</th>
              <th className="px-4 py-2 text-left border-b">
                Estimated Delivery
              </th>
              <th className="px-4 py-2 text-left border-b">Actual Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{order.orderIdString}</td>
                <td className="px-4 py-2 border-b">{order.customer?.name}</td>
                <td className="px-4 py-2 border-b">{order.tailorName}</td>
                <td className="px-4 py-2 border-b">{order.status}</td>
                <td className="px-4 py-2 border-b">{order.totalAmount}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 border-b">
                  {order.actualDeliveryDate
                    ? new Date(order.actualDeliveryDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderSummary;
