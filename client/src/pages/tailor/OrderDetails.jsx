import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Replace with your actual data fetching logic
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Failed to fetch order:", err));
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Order Details (ID: {id})</h1>
      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <h2 className="text-lg font-semibold mt-6">Items</h2>
      <ul className="list-disc pl-6">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} — Qty: {item.quantity}, Price: {item.price}
          </li>
        ))}
      </ul>

      <p className="mt-4"><strong>Total:</strong> ${order.total}</p>
    </div>
  );
}
