import React, { useState } from "react";
import "./LogisticDetails.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import AcceptDelivery from "../../components/acceptDelivery/AcceptDelivery";

const sampleLogisticsData = [
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Mogappair",
    pickupLocation: "Valasaravakkam",
    deliveryLocation: "Thirumangalam",
    itemName: "Bread",
    itemQuantity: 10,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Kilpauk",
    pickupLocation: "Nungambakkam",
    deliveryLocation: "Adyar",
    itemName: "Milk",
    itemQuantity: 5,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Vadapalani",
    pickupLocation: "T. Nagar",
    deliveryLocation: "Besant Nagar",
    itemName: "Vegetables",
    itemQuantity: 20,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Ashok Nagar",
    pickupLocation: "Chetpet",
    deliveryLocation: "Ekkatuthangal",
    itemName: "Fruits",
    itemQuantity: 15,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Chennai Central",
    pickupLocation: "Egmore",
    deliveryLocation: "Nandanam",
    itemName: "Bottled Water",
    itemQuantity: 25,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Arumbakkam",
    pickupLocation: "Koyambedu",
    deliveryLocation: "Thiruvanmiyur",
    itemName: "Snacks",
    itemQuantity: 30,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Royapettah",
    pickupLocation: "Mylapore",
    deliveryLocation: "Velachery",
    itemName: "Canned Goods",
    itemQuantity: 12,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Kotturpuram",
    pickupLocation: "Nungambakkam",
    deliveryLocation: "Mount Road",
    itemName: "Frozen Foods",
    itemQuantity: 8,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Saidapet",
    pickupLocation: "Chrompet",
    deliveryLocation: "Pallikaranai",
    itemName: "Office Supplies",
    itemQuantity: 50,
    pickedUp: false,
    delivered: false,
  },
  {
    logisticsName: "Expresslogistics",
    logisticsLocation: "Tidel Park",
    pickupLocation: "Guindy",
    deliveryLocation: "Alwarpet",
    itemName: "Electronics",
    itemQuantity: 7,
    pickedUp: false,
    delivered: false,
  },
];


export const LogisticDetails = () => {
  const [selectedTab, setSelectedTab] = useState("basic");
  const [donationDetails, setDonationDetails] = useState({ item: "", quantity: 0 });
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleAcceptDelivery = async () => {
    
    const randomIndex = Math.floor(Math.random() * sampleLogisticsData.length);
    const randomLogisticsData = sampleLogisticsData[randomIndex];

    try {
      await newRequest.post("/logistics", randomLogisticsData);
      console.log("Logistics data saved successfully:", randomLogisticsData);
    } catch (error) {
      console.error("Error saving logistics data:", error);
    }
  };

  return (
    <div className="logisticDetails">
      <div className="container">
        <div className="left">
          <h1><strong>Delivery Request : </strong>Need food items.</h1>
          <div className="user">
            <img
              className="pp"
              src="https://i.pinimg.com/originals/0e/21/3b/0e213bc567b6ed03e3a2de4404416ecc.gif"
              alt=""
            />
            <span>Rescue Agency</span>
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
          <p>Need food items.</p>
          <div className="seller">
            <h2>About The Rescue Agency</h2>
            <div className="user">
              <img
                src="https://i.pinimg.com/originals/0e/21/3b/0e213bc567b6ed03e3a2de4404416ecc.gif"
                alt=""
              />
              <div className="info">
                <span>Rescue Agency</span>
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
              src="/img/vishaaln.png"
              alt=""
            />
            <span>Donor : Vishaal</span>
          </div>
          <div className="price">
            <h3><strong>For : </strong>Requesting Food items</h3>
            <br />
          </div>
          <p>Surya is requesting food from Meenambakkam</p>
          <div className="status">
            <span className="status-dot"></span>
            <span className="status-text">Active</span>
          </div>
          <div className="details">
            <div className="item">
              <span><strong>Pickup : </strong>From Anna Nagar</span>
              <br />
              <span><strong>Destination : </strong>To Thirumangalam</span>
            </div>
          </div>
          <div className="features">
            <AcceptDelivery onAccept={handleAcceptDelivery} />
          </div>
          <p className="scroll">Scroll down for more info</p>
        </div>
      </div>
    </div>
  );
};
