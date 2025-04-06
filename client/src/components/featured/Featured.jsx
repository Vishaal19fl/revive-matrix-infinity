import React from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      {/* Desktop video */}
      <video autoPlay muted loop playsInline className="background-video desktop">
        <source src="./img/lifeline8.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Mobile video */}
      <video autoPlay muted loop playsInline className="background-video mobile">
        <source src="./img/lifeline8.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        <div className="left">
          <h1></h1>
          <div className="search">
            <div className="searchInput">
              {/* <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "Web Development"'
                onChange={(e) => setInput(e.target.value)}
              /> */}
            </div>
            {/* <button onClick={handleSubmit}>Search</button> */}
          </div>
        </div>
        {/* <div className="right">
          <img src="https://pngimg.com/d/elon_musk_PNG16.png" alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default Featured;
