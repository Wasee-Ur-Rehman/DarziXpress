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
import TailorListing from './pages/customer/TailorListing'; // Import TailorListing

import ChangePassword from './pages/ChangePassword.jsx'; // Import ChangePassword


//tailor imports
// Tailor Layout and Pages
import TailorLayout from './layouts/TailorLayout.jsx';
import TailorDashboard from './pages/tailor/TailorDashboard.jsx';
import ManageOrders from './pages/tailor/ManageOrders.jsx';
import TailorMeasurements from './pages/tailor/TailorMeasurements.jsx';
import MyListings from './pages/tailor/MyListings.jsx';
import PostServiceForm from './pages/tailor/PostServiceForm.jsx';
import MyEarnings from './pages/tailor/MyEarnings.jsx';
import OrderDetails from './pages/tailor/OrderDetails.jsx';
// import TailorProfile from './pages/tailor/TailorProfile.jsx';
// import TailorSettings from './pages/tailor/TailorSettings.jsx';

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
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="listing" element={<TailorListing />} />
        </Route>

          {/* Tailor Routes */}
        <Route path="/tailor" element={<TailorLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<TailorDashboard />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="measurements" element={<TailorMeasurements />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="post-service" element={<PostServiceForm />} />
          <Route path="earnings" element={<MyEarnings />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
