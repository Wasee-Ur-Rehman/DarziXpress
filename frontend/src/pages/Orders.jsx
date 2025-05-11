import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Orders = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [declinedOrders, setDeclinedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const [activeRes, completedRes, declinedRes] = await Promise.all([
        axios.get(`${baseURL}/admin/orders/active`),
        axios.get(`${baseURL}/admin/orders/completed`),
        axios.get(`${baseURL}/admin/orders/declined`),
      ]);
      setActiveOrders(activeRes.data);
      setCompletedOrders(completedRes.data);
      setDeclinedOrders(declinedRes.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  const downloadSummary = () => {
    let content = '--- ORDER SUMMARY ---\n\n';

    const formatOrders = (title, orders) => {
      let section = `\n${title}:\n`;
      if (orders.length === 0) section += 'No orders.\n';
      else {
        orders.forEach(order => {
          section += `• ${order.customerName} | ${order.description} | ${new Date(order.createdAt).toLocaleDateString()}\n`;
        });
      }
      return section;
    };

    content += formatOrders('Active Orders', activeOrders);
    content += formatOrders('Completed This Month', completedOrders);
    content += formatOrders('Declined Orders', declinedOrders);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders_summary.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderOrderCard = (order) => (
    <div
      key={order._id}
      className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
    >
      <p className="font-semibold text-gray-800">{order.customerName}</p>
      <p className="text-sm text-gray-600 mt-1">{order.description}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(order.createdAt).toLocaleDateString()}
      </p>
    </div>
  );

  return (
    <div className="space-y-10 p-6">
     <div className="flex justify-between items-start mb-6">
  <h2 className="text-2xl font-bold">Orders Overview</h2>
  <button
    onClick={downloadSummary}
    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-md shadow-md transition-all duration-200 "style={{ backgroundColor: "#5a67d8", color: "white",height: "40px" }}>
    Download Summary
  </button>
</div>

      <section>
        <h3 className="text-xl font-semibold mb-4">Active Orders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activeOrders.map(renderOrderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Completed This Month</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {completedOrders.map(renderOrderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Declined Orders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {declinedOrders.map(renderOrderCard)}
        </div>
      </section>
    </div>
  );
};

export default Orders;
