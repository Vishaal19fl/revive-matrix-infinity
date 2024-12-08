import React, { useState } from "react";
import "./Login1.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel className="carousel" data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="img1"
          src="/img/rescueimg1.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Rescue is not just about saving lives;</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img2"
          src="img/rescueimg2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>it’s about restoring hope</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img3"
          src="/img/rescueimg3.png"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5> and rebuilding futures.</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

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
      <div className="carousel-container">
        <DarkVariantExample />
      </div>

      <div className="form-container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" style={{ backgroundColor: "#004aad" }}>
              Login
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
