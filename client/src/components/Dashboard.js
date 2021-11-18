/** @format */

import React from "react";
import Metrics from "./Metrics";
const Dashboard = () => {
  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Dashboard</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Metrics />
      </div>
    </div>
  );
};

export default Dashboard;
