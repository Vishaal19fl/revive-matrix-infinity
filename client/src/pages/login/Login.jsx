import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
      window.location.reload(); 
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Uncomment and configure ReCAPTCHA if needed */}
        {/* <ReCAPTCHA
            sitekey="your-site-key"
            onChange={onChange}
          /> */}

        <button type="submit" style={{ backgroundColor: "#004aad" }}>Login</button>

        {error && <p>{error}</p>}
      </form>
      </div>
    </div>
  );
}

export default Login;
