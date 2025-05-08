// /App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CustomerLayout from './layouts/CustomerLayout';  // Import CustomerLayout
import CustomerDashboard from './pages/customer/CustomerDashboard.jsx';   // Import Dashboard
import Orders from './pages/customer/Orders';         // Import Orders
import Profile from './pages/customer/ProfileInfo'; // Import Profile
import Measurements from './pages/customer/Measurements'; // Import Measurements
import ChangePassword from './pages/customer/ChangePassword'; // Import ChangePassword
import TailorListing from './pages/customer/TailorListing'; // Import TailorListing

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="measurements" element={<Measurements />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="listing" element={<TailorListing />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
