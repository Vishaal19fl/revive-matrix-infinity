import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donation.scss";
import newRequest from "../../utils/newRequest";

function Donation({ onConfirm }) {
  const [showPopup, setShowPopup] = useState(false);
  const [donationItem, setDonationItem] = useState("");
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleDonation = async () => {
    try {
      const capitalizedItem = capitalizeFirstLetter(donationItem); // Capitalize the first letter
      const response = await newRequest.post("/orders", {
        donorName: currentUser.username,
        donorEmail: currentUser.email,
        donationItem: capitalizedItem,
        quantity, // Include quantity in the request
      });
      console.log(response.data); // Handle successful donation

      
      await newRequest.post("/inventory/update", {
        itemName: capitalizedItem,
        quantity, // Include quantity in the update
      });

      setShowPopup(false); // Close the popup after successful donation
      setDonationItem(""); // Clear the input field
      setQuantity(1); // Reset quantity

      // Navigate to the checkout page with the donation details
      onConfirm({ item: capitalizedItem, quantity });
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setDonationItem(""); // Clear the input field
    setQuantity(1); // Reset quantity
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 1)); // Ensure quantity doesn't go below 1
  };

  return (
    <div className="donation">
      <h2></h2>
      <p></p>
      <button onClick={openPopup}>Donate Items</button>

      {showPopup && (
        <div className="donation-popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h3>Donate Items</h3>
            <input
              type="text"
              placeholder="Enter the item you want to donate"
              value={donationItem}
              onChange={(e) => setDonationItem(e.target.value)}
            />
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <div className="buttons">
              <button onClick={handleDonation}>Confirm</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Donation;
