import React, { useState } from 'react';
import { Select, SelectItem } from '@/components/ui/select';

const MyListings = () => {
  const [orderFilter, setOrderFilter] = useState('All');

  // Sample services data
  const services = [
    {
      title: "Men's 2-Piece Suit Stitching",
      category: "Men's Formal",
      price: 8500,
      availability: "Fixed",
      provider: "Ali Tailors",
      location: "Lahore",
      rating: "4.5",
      thumbnail: "https://via.placeholder.com/300x200?text=2-Piece+Suit",
      assignedOrders: 10, // Number of orders assigned for this service
    },
    {
      title: "Bridal Dress Designing",
      category: "Women's Bridal",
      price: 20000,
      availability: "Flexible",
      provider: "Zahra Couture",
      location: "Karachi",
      rating: "4.8",
      thumbnail: "https://via.placeholder.com/300x200?text=Bridal+Dress",
      assignedOrders: 0, // No orders assigned
    },
    {
      title: "Casual Shirt Stitching",
      category: "Men's Casual",
      price: 2500,
      availability: "Fixed",
      provider: "Hassan Stitching House",
      location: "Islamabad",
      rating: "4.2",
      thumbnail: "https://via.placeholder.com/300x200?text=Casual+Shirt",
      assignedOrders: 5, // 5 orders assigned for this service
    },
  ];

  // Filtering logic based on the number of orders assigned
  const filteredServices = services.filter(service => {
    if (orderFilter === 'All') return true;
    if (orderFilter === 'With Orders' && service.assignedOrders > 0) return true;
    if (orderFilter === 'No Orders' && service.assignedOrders === 0) return true;
    return false;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Posted Services</h2>

      {/* Order Assigned Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <div className="w-48">
          <Select onChange={(e) => setOrderFilter(e.target.value)}>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="With Orders">With Orders</SelectItem>
            <SelectItem value="No Orders">No Orders</SelectItem>
          </Select>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.length === 0 ? (
          <p className="text-gray-500">No services found with the selected filter.</p>
        ) : (
          filteredServices.map((service, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              {service.thumbnail && (
                <img
                  src={service.thumbnail}
                  alt="Service Thumbnail"
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600">Category: {service.category}</p>
              <p className="text-sm text-gray-600">Price: PKR {service.price}</p>
              <p className="text-sm text-gray-600">Availability: {service.availability}</p>
              <p className="text-sm">Assigned Orders: {service.assignedOrders}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyListings;
