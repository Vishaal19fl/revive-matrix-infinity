import React, { useState } from "react";
import "./AddItem.scss";
import newRequest from "../../utils/newRequest";

function AddItem({ donation }) {
  const [showPopup, setShowPopup] = useState(false);
  const [donationItem, setDonationItem] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleDonation = async () => {
    try {
      const capitalizedItem = capitalizeFirstLetter(donationItem); // Capitalize the first letter
      const response = await newRequest.post("/orders", {
        donorName: currentUser.username,
        donorEmail: currentUser.email,
        donationItem: capitalizedItem,
      });
      console.log(response.data); // Handle successful donation

      // Update inventory after successful donation
      await newRequest.post("/inventory/update", { itemName: capitalizedItem });

      setShowPopup(false); // Close the popup after successful donation
      setDonationItem(""); // Clear the input field
      window.location.reload();
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
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="donation">
      <h2></h2>
      <p></p>
      <button onClick={openPopup}>Add Items</button>

      {showPopup && (
        <div className="donation-popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h3>Add Items to Inventory</h3>
            <input
              type="text"
              placeholder="Enter the items to be added"
              value={donationItem}
              onChange={(e) => setDonationItem(e.target.value)}
            />
            <div className="buttons">
              <button onClick={handleDonation}>Add</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddItem;
