import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.scss";
import { capitalize } from "@mui/material";

const Checkout = () => {
  const location = useLocation();
  const { donationDetails, location: pickupLocation, rescueagency, pp } = location.state;
  const [confirmed, setConfirmed] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleConfirm = () => {
    setTimeout(() => {
      setConfirmed(true);
    }, 2000); 
  };

  const name = capitalize(currentUser.username);

  return (
    <div className="checkout">
      
      <h2>Donation Details</h2>
      <div className="infos">
      <div className="user">
        <img className="profilepic" src={currentUser.img || "/img/noavatar.jpg"} alt="" />
        <p><strong>Donor Name:</strong> {name} </p>
      </div>
      <div className="user">
        <img className="profilepic" src={ pp || "/img/noavatar.jpg"} alt="" />
        <p><strong>Rescue Agency:</strong> {rescueagency} </p>
      </div>
      </div>
      <div className="certified-tag">Certified by <strong>Revive</strong></div>
      <div className="checkout-details">
        <p><strong>Donation Item:</strong> {donationDetails.item}</p>
        <p><strong>Quantity:</strong> {donationDetails.quantity}</p>
        <p><strong>Location:</strong> To {pickupLocation}</p>
      </div>
      {confirmed && (
        <p className="status">Status: <span className="confirmed"> Confirmed </span></p>
      )}
      {confirmed && (
        <p className="logistics">Our Logistics partner is on the way to pick up the items.</p>
      )}
      <button onClick={() => window.print()}>Print</button>
      {!confirmed && (
        <button onClick={handleConfirm}>Confirm</button>
      )}
    </div>
  );
};

export default Checkout;
