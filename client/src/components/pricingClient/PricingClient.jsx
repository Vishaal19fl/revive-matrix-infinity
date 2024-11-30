import React, { useState } from "react";
import "./PricingClient.scss";

import { Link } from "react-router-dom";

const PricingClient = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));  
  
  const [isYearly, setIsYearly] = useState(false);

  const packages = !currentUser?.isSeller ? [
    {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "The Free Plan offers essential features at no cost: register, connect, and get started. Advanved features are not included.  ",
      icon1:'✅',
      icon2:'✅',
      icon3:'✅',
      icon4:'❌',
      icon5:'❌',


    },
    
    {
      name: 'Premium',
      monthlyPrice: 499,
      yearlyPrice: 4500,
      description: "The Premium Plan provides advanced tools: collaborate, access exclusive resources, and get priority support.",
      icon1:'✅',  
      icon2:'✅',
      icon3:'✅',
      icon4:'✅',
      icon5:'✅',
    },
  ] : [
    {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "The Free Plan offers essential features at no cost: register, connect, and get started. Advanved features are not included.  ",
      icon1:'✅',
      icon2:'✅ Limited',
      icon3:'✅ Includes',
      icon4:'❌',
      icon5:'❌ Limited',
      icon6:'❌',
      icon7:'❌',
      icon8:'❌',  

    },
    
    {
      name: 'Premium',
      monthlyPrice: 799,
      yearlyPrice: 8500,
      description: "The Premium Plan provides advanced tools: collaborate, access exclusive resources, and get priority support.",
      icon1:'✅',  
      icon2:'✅ Unimited',
      icon3:'✅ No',
      icon4:'✅',
      icon5:'✅ Unlimited',
      icon6:'✅',
      icon7:'✅',
      icon8:'✅',
    }, ];

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h2>Here are our plans</h2>
        <p>The Premium plan offers a suite of advanced features designed to streamline your workflow and save you valuable time. Enjoy enhanced tools and support that allow you to focus on what matters most.</p>

        <div className="toggle-container">
          <label htmlFor="toggle">
            <span>Monthly</span>
            <div className="toggle-switch">
              <div className={`toggle-thumb ${isYearly ? 'toggle-thumb-yearly' : ''}`}></div>
            </div>
            <span>Yearly</span>
          </label>
          <input
            type="checkbox"
            id="toggle"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
        </div>
      </div>

      <div className="pricing-grid">
        {packages.map((pkg, index) => (
          <div key={index} className="pricing-card">
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <br/>
            <p className="price">
              {isYearly ? `₹${pkg.yearlyPrice}` : `₹${pkg.monthlyPrice}`}/
              
              {isYearly ? 'year' : 'month'}
            </p>
            {!currentUser?.isSeller ? <ul>
              <li>{pkg.icon1} Registration</li>
              <li>{pkg.icon2} Instalment Payment</li>
              <li>{pkg.icon3} Multi-Freelancer Team</li>
              <li> {pkg.icon4}Featured Freelancer Hiring</li>
              <li>{pkg.icon5} Simultaneous Projects</li>
              <li>{pkg.icon5} Featured Jobs ( Reduced Waiting Time )</li>
            </ul> :
            
            <ul>
              <li>{pkg.icon1} Registration</li>
              <li>{pkg.icon2} Number of proposals</li>
              <li>{pkg.icon3} Verification charge</li>
              <li> {pkg.icon4} Sponsored Services ( Reduced Waiting Time )</li>
              <li>{pkg.icon5} Number of Services</li>
              <li>{pkg.icon6} Smart Business Card</li>
              <li>{pkg.icon7} Mentorship</li>
              <li>{pkg.icon8} Virtual Events / Workshops</li>
            </ul>
            }
            <Link className="link" to="/register">{pkg.name === 'Free' && <button className="get-started">Register</button>}</Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingClient;
