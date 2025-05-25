import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link added here
import supabase from "../supabase";
import "../style/login.css";
import useAuthRedirect from "../hooks/useAuthRedirect";




function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useAuthRedirect();


  async function handleform(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.session?.access_token) {
      localStorage.setItem("user_token", data.session.access_token);
      localStorage.setItem("user_role", "user");
      localStorage.setItem("active_role", "user"); // or "admin"


      navigate("/userhome");
    }

  }

  return (
    <div className="auth-wrapper">
      <div className="auth-form-container">
        <h1 className="auth-heading">Login</h1>

        <form onSubmit={handleform} className="auth-form">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        {/* 👇 Register link below form */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Not registered yet?{" "}
          <Link to="/userregister" style={{ color: "#007bff", textDecoration: "underline" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}


export default Login;
