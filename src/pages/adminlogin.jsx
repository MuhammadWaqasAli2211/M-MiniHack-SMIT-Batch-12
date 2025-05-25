import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css"; // Same style as user login




function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Predefined static credentials
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";



  const handleform = (e) => {
    e.preventDefault();




    // check for valid Role & token
if (email === adminEmail && password === adminPassword) {
      const adminToken = crypto.randomUUID(); // ✅ Generate random token
      localStorage.setItem("admin_token", adminToken);
      localStorage.setItem("admin_role", "admin");
      localStorage.setItem("active_role", "admin"); // or "admin"
      navigate("/adminhome");
} else {
      alert("Invalid admin credentials");
}
};



// Return UI
  return (
    <div className="auth-wrapper">
      <div className="auth-form-container">
        <h1 className="auth-heading">Admin Login</h1>

        <form onSubmit={handleform} className="auth-form">
          <input
            type="email"
            value={email}
            placeholder="Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          <input
            type="password"
            value={password}
            placeholder="Admin Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
