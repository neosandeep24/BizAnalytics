import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Reusing existing CSS

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload Data</Link></li>
        <li><Link to="/department-analysis">Department Analysis</Link></li>
        <li><Link to="/profit-distribution">Profit Distribution</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
