import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import '../style/register.css'; // 🟡 Import CSS
import useAuthRedirect from "../hooks/useAuthRedirect";




const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useAuthRedirect();

  async function handleform(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Registration successful!');
      navigate('/userlogin');
    }
  }



  // register form html return function
  return (

    <div className="register-wrapper">
      <form className="register-form" onSubmit={(e)=>{ handleform(e)}}>
        <h2>Create Account</h2>

        {/* email input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />


      {/* password input */}
        <input
          type="password"
          placeholder="Enter a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        {/* register button */}
        <button type="submit">Register</button>
        <p className="login-link" onClick={() => navigate('/userlogin')}>
          Already have an account? <span>Login</span>
        </p>


      </form>
    </div>

    // return function ends here
  );
};

export default Register;
