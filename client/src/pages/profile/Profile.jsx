import React from 'react'
import "./Profile.scss"
import { Link } from 'react-router-dom';


export const Profile = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          
          <div className="seller">
            <h2>About</h2>
            <div className="user">
              <img
                src="/img/svishaal.jpg"
                alt=""
              />
              <div className="info">
                <span>Vishaal S</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">India</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Feb 2024</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Skills</span>
                  <span className="desc">Digital Marketing, Branding</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English, Tamil</span>
                </div>
              </div>
              <hr />
              <p>
              As a seasoned freelancer specializing in React, JavaScript, and UI/UX design, I bring a unique blend of technical expertise and creative flair to every project I undertake. With a passion for crafting intuitive user experiences and clean, efficient code, I thrive in translating client visions into reality. With years of experience in the industry, I have honed my skills in front-end development, leveraging the latest technologies and best practices to deliver seamless, responsive web applications. Whether it's building interactive interfaces, optimizing performance, or refining user journeys, I am dedicated to exceeding client expectations and delivering solutions that resonate with end-users.
              </p>
            </div>
            {currentUser?.isSeller && <h2>Services</h2>}
          
        {currentUser?.isSeller && <div className="right">
        <div className="user">
            <img
              className="pp"
              src="/img/svishaal.jpg"
              alt=""
            />
            <span>Vishaal S</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          </div>
          <div className="price">
          
            <h3>Digital Marketing Expert</h3>
            <br/>
            <h2>Rs. 2999</h2>
          </div>
          <p>
            Digital marketer
          </p>
          <div className="details">
            
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Branding Design</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Development</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Promotion and Content</span>
            </div>
            
          </div>
         
          <div className="btns">
            
            <button className="btn1">Wave Now</button>
            
            
           
            </div>
           
            
            </div> }
          </div>
          
        
            <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="/img/seller4.jpg"
                  alt=""
                />
                <div className="info">
                  <span>Joseph</span>
                  <div className="country">
                    {/* <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    /> */}
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                A beautiful UI design and excelent UX. He delivered a perfect website
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Monisha</span>
                  <div className="country">
                    {/* <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                      alt=""
                    /> */}
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                The quality and speed of delivery is unmatched. Had a wonderful experience working with him. 
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="/img/svishaal.jpg/"
                  alt=""
                />
                <div className="info">
                  <span>Shakithiyan </span>
                  <div className="country">
                    
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                Best value for money. Amazing execution.
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
          </div>
            </div> 
      
    </div> 
    
    </div>
    
    
    
  );
}
