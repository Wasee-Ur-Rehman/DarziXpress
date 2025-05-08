import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const CustomerNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-indigo-600 text-white flex justify-between items-center p-4">
            {/* Left Section: DarziXpress Logo, Dashboard, Orders */}
            <div className="flex items-center space-x-8">
                <div className="text-xl font-semibold">
                    <Link to="/" className="text-white hover:text-indigo-200">DarziXpress</Link>
                </div>
                <Link to="/customer/dashboard" className="text-white hover:text-indigo-200">Dashboard</Link>
                <Link to="/customer/orders" className="text-white hover:text-indigo-200">Orders</Link>
            </div>

            {/* Right Section: Profile Icon with Dropdown */}
            <div className="relative">
                <FaUserCircle
                    className="text-2xl cursor-pointer"
                    onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                        <div className="p-2">
                            <Link to="/customer/profile" className="block px-4 py-2 hover:bg-gray-100">Profile Info</Link>
                            <Link to="/customer/measurements" className="block px-4 py-2 hover:bg-gray-100">Measurements</Link>
                            <Link to="/customer/change-password" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link>
                        </div>
                    </div>
                )}
                <IoIosArrowDown
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={toggleDropdown}
                />
            </div>
        </div>
    );
};

export default CustomerNavbar;
