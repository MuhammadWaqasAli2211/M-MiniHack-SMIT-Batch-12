import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/dashboard.css'




const Dashboard = () => {
  const navigate = useNavigate();



  // Function for Admin Navigation
  const handleAdminClick = () => {
    const adminToken = localStorage.getItem("admin_token");
    const adminRole = localStorage.getItem("admin_role");

    if (adminToken && adminRole === "admin") {
      navigate("/adminhome");
    } else {
      navigate("/adminlogin");
    }
  };




  // Function for User Navigation
  const handleUserClick = () => {
    const userToken = localStorage.getItem("user_token");
    const userRole = localStorage.getItem("user_role");

    if (userToken && userRole === "user") {
      navigate("/userhome");
    } else {
      navigate("/userlogin");
    }
  };



// Return UI
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <h1>Event Management System</h1>
      </header>

      {/* Buttons */}
      <div style={styles.container}>
        <button style={styles.button} onClick={handleUserClick}>
          Login as User
        </button>
        <button style={styles.button} onClick={handleAdminClick}>
          Login as Admin
        </button>
      </div>
    </div>
  );
};



// Dashboard InLine Css
const styles = {
  header: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    fontSize: '24px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};



export default Dashboard;
