// src/components/AdminNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserCircle, ChevronDown, LogOut } from "lucide-react";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  const userName = "Admin";
  const userEmail = "admin@darziexpress.com";

  const dropdownItems = [
    {
      name: "Manage Profile",
      path: "/admin/manage-profile",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        DarziExpress
      </div>
      <div className="nav-links">
        <NavLink
          to="/admin/dashboard"
          className="nav-link"
          activeClassName="text-indigo-600"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="nav-link"
          activeClassName="text-indigo-600"
        >
          Orders
        </NavLink>
        {/* <NavLink
          to="/admin/profile"
          className="nav-link"
          activeClassName="text-indigo-600"
        >
          Profile
        </NavLink> */}
        <NavLink
          to="/admin/manage-profile"
          className="nav-link"
          activeClassName="text-indigo-600"
        >
          Manage Profile
        </NavLink>
      </div>

      {/* Profile Dropdown */}
      <div className="relative profile-dropdown" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center p-1.5 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          aria-expanded={isDropdownOpen}
        >
          <UserCircle size={28} className="text-slate-500" />
          <ChevronDown
            size={16}
            className={`ml-1 text-slate-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-1 z-20">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-500 truncate">{userEmail}</p>
            </div>
            <div className="py-1">
              {dropdownItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  {item.icon && (
                    <span className="mr-3 text-slate-400">{item.icon}</span>
                  )}
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
