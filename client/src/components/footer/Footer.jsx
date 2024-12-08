import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
          <h2>Categories</h2>
            <span>Food</span>
            <span>Medicine</span>
            <span>Bedsheets</span>
            <span>Bed rolls</span>
            <span>Others</span>
           
            
          </div>
          <div className="item">
            <h2>About</h2>
            {/* <span>Press & News</span> */}
            <span>Partnerships</span>
            <Link className='link' to="https://policies.google.com/privacy"><span>Privacy Policy</span></Link>
            
            <Link className='link' to="https://policies.google.com/terms"><span>Terms of Service</span></Link>
            {/* <span>Intellectual Property Claims</span>
            <span>Investor Relations</span> */}
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
           
          </div>
          <div className="item">
            <h2>Forum</h2>
          
            <span>Revive Hub</span>
            <span>Join Us</span>
            <span>Partner with Us</span>
            
            
          </div>
          <div className="item">
            <h2>More From Revive</h2>
            <span>Revive Workshops</span>
           
            <span>Revive Projects</span>
            <span>Get Inspired</span>
            <span>Revive Help</span>
           
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Revive.</h2>
            <span>© This WebApp is protected by reCAPTCHA and Google</span>
          </div>
          <div className="right">
            {/* <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div> */}
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            {/* <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div> */}
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
