import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/landingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CustomerLayout from './layouts/CustomerLayout';  // Import CustomerLayout
import Dashboard from './pages/customer/Dashboard';   // Import Dashboard
import Orders from './pages/customer/Orders';         // Import Orders
import Profile from './pages/customer/ProfileInfo'; // Import Profile
import Measurements from './pages/customer/Measurements'; // Import Measurements
import ChangePassword from './pages/customer/ChangePassword'; // Import ChangePassword

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
          {/* Redirect /customer to /customer/dashboard */}
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="measurements" element={<Measurements />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
