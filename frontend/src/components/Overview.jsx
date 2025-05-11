// src/components/Overview.jsx
import React from 'react';

const Overview = ({ data }) => {
  return (
    <div className="overview-container">
      <h2 className="section-title">Overview</h2>
      <div className="overview-stats">
        <div className="stat-item">
          <h3>Total Profits</h3>
          <p>${data.totalProfits}</p>
        </div>
        <div className="stat-item">
          <h3>Pending Tailor Requests</h3>
          <p>{data.pendingRequests}</p>
        </div>
        <div className="stat-item">
          <h3>Disabled Tailors</h3>
          <p>{data.disabledTailors}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
