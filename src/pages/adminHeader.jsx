import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust path if needed
import "../style/adminheader.css"; // Link to CSS
import supabase from '../supabase';

const UserHeader = () => {
  const navigate = useNavigate();

// logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("admin_token");
localStorage.removeItem("admin_role");

    navigate('/dashboard');
  };

  return (
    <header className="admin-header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="dashboard-title">Admin Dashboard</div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default UserHeader;
