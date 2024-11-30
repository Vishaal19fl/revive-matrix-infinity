import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or you do not have access to it.</p>
        <Link to="/" className="home-link">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
