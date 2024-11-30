import React, { useState } from "react";
import "./ShelterPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { Slider } from "infinite-react-carousel";
import Donation from "../../components/donation/Donation";

export const ShelterDetails = () => {
  const [selectedTab, setSelectedTab] = useState("basic");
  const [donationDetails, setDonationDetails] = useState({ item: "", quantity: 0 });
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleDonationConfirm = (details) => {
    setDonationDetails(details);
    navigate("/checkout", { state: { donationDetails: details, location: "Meenambakkam", rescueagency: "Anna Nagar", pp:"https://i.pinimg.com/originals/0e/21/3b/0e213bc567b6ed03e3a2de4404416ecc.gif" } });
  };

  return (
    <div className="shelterPageDetails">
      <div className="container">
        <div className="left">
          <h1>Need Bed rolls - 25.</h1>
          <div className="user">
            <img
              className="pp"
              src="/img/shelter.png"
              alt=""
            />
            <span>Shelter - Valasaravakkam</span>
          </div>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31101.72347071431!2d80.16853235!3d12.99004395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52609ef059c837%3A0x3cd190a67366865b!2sMeenambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719721425434!5m2!1sen!2sin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "90%", border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <h2>About This Request</h2>
          <p>Need Bed rolls - 25.</p>
          <div className="seller">
            <h2>About The Shelter</h2>
            <div className="user">
              <img
                src="/img/shelter.png"
                alt=""
              />
              <div className="info">
                <span>Shelter - Valasaravakkam</span>
                <button>Contact Us</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">India</span>
                </div>
                <div className="item">
                  <span className="title">Location</span>
                  <span className="desc">Anna Nagar</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Services</span>
                  <span className="desc">Relief agency, Delivery, Fire rescue</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English, Tamil</span>
                </div>
              </div>
              <hr />
              <p>
                Anna Nagar Rescue Agency is a dedicated organization based in the vibrant locality of Anna Nagar,
                committed to providing emergency response and support services to the community. With a focus on swift
                action and compassionate care, the agency operates 24/7 to address various rescue situations, ensuring
                safety and well-being for all.
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="user">
            <img
              className="pp"
              src="/img/shelter.png"
              alt=""
            />
            <span>Shelter - Valasaravakkam</span>
          </div>
          <div className="price">
            <h3>Requesting Bed rolls</h3>
            <br />
            {selectedTab === "basic" && <h2>From Meenambakkam</h2>}
            {selectedTab === "intermediate" && <h2>Rs. 4999</h2>}
            {selectedTab === "elite" && <h2>Rs. 7999</h2>}
          </div>
          <p>Meena is requesting food from Meenambakkam</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>Estimated 1 hour Delivery from your location</span>
            </div>
          </div>
          <div className="features">
            <Donation onConfirm={handleDonationConfirm} />
          </div>
          <p className="scroll">Scroll down for more info</p>
        </div>
      </div>
    </div>
  );
};
