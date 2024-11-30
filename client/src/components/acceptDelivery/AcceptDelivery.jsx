import React, { useState } from "react";
import "./AcceptDelivery.scss";
import { useNavigate } from "react-router-dom";

function AcceptDelivery({ onAccept }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleTrackStatus = () => {
    if (onAccept) onAccept();
    closePopup();
    navigate("/status");
  };

  return (
    <div className="acceptdelivery">
      <h2></h2>
      <p></p>
      <button
        className="accept"
        onClick={openPopup}
        style={{ backgroundColor: "#ff9500", padding: "15px 20px" }}
      >
        Accept Delivery
      </button>

      {showPopup && (
        <div className="delivery-popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            {isConfirmed ? (
              <>
                <h3>The Delivery has been accepted!</h3>
                <button className="track-status" onClick={handleTrackStatus}>
                  Update Status
                </button>
              </>
            ) : (
              <>
                <h3>Are you sure?</h3>
                <button className="confirm" onClick={handleConfirm}>
                  Confirm
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AcceptDelivery;
