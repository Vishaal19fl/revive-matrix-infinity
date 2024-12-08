import React, { useEffect, useState } from "react";
import "./product.scss";
import { useNavigate } from "react-router-dom";
import Donation from "../../components/donation/Donation";

export const Product = () => {
  const [selectedTab, setSelectedTab] = useState("basic");
  const [donationDetails, setDonationDetails] = useState({ item: "", quantity: 0 });
  const [quantity, setQuantity] = useState(1); // State for quantity
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState("img/lifelinefront.png"); // Main product image state
  const thumbnailImages = [
    "img/lifelinead1.png",
    "img/lifelinead2.png",
    "img/lifelinead3.png",
    "img/lifelinead4.png",
  ]; // Array of thumbnail image paths

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image); // Update the main product image
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, []);

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <h1>Revive Node.</h1>
          <div className="user">
            {/* <img
              className="pp"
              src="img/logo3.png"
              alt="matrix infinity logo"
            /> */}
            <img className="pp" src="img/matrixinfinitylogo.png" alt="" />

            <span>Matrix Infinity</span>
          </div>
          <div className="node">
            {/* Main Product Image */}
            <img className="nodeimg" src={mainImage} height="450px" alt="Product" />
          </div>

          {/* Thumbnails */}
          <div className="thumbnails" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {thumbnailImages.map((image, index) => (
              <img
               className="nodeimgs"
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: "192px", height: "110px", cursor: "pointer", border: mainImage === image ? "2px solid " : "none" }}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
            <br />
          <h2>About The Product</h2>
          <p className="description">
          <strong>Power Consumption:</strong> <br />
            Peak Consumption: 220 mA <br />
            Sleep Mode: 20.2 uA <br />
            Estimated Battery Life: 4300 mAh <br />
            Hand Crank Generator Power: 5 W
          </p>
          <hr />
          <p><strong>Product Description:</strong></p>
          <p>
          The <strong>Revive Node</strong> is a compact and versatile communication device designed for disaster management and remote communication needs. It features a 1276 LoRa transceiver with a 433 MHz antenna, enabling a robust LoRa network formation with a 2 km range. Powered by a 4300 mAh lithium-ion battery and a supercapacitor for AC to DC rectification, it ensures consistent performance and includes reverse charging support (5V, 2A) via a USB port for powering external devices. Its user-friendly design incorporates a 1.3-inch OLED display, LED indicators, and two navigation buttons for intuitive interaction, all housed within a compact 150 x 85 x 45 mm frame. With an integrated buck-boost converter for stable power regulation, the Revive Node is an essential tool for seamless connectivity and efficient communication in critical situations.          </p>
          <hr />
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img src="img/matrixinfinitylogo.png" alt="" />
              <div className="info">
                <span>Matrix Infinity</span>
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
                  <span className="desc">Chennai</span>
                </div>
                <div className="item">
                  <span className="title">Who are we?</span>
                  <span className="desc">Young Entrepreneurs</span>
                </div>
                <div className="item">
                  <span className="title">Services</span>
                  <span className="desc">Real-time data Aggregation , Instant response , Offline communication</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">All Languages</span>
                </div>
              </div>
              <hr />
              <p>
              We are proud students of Rajalakshmi Engineering College, driven by innovation and a commitment to societal impact. Our flagship product, Revive, is a groundbreaking solution designed to revolutionize disaster management. It combines a robust software aggregation platform with the Revive Node, a versatile hardware unit that functions as a personal hotspot. This system enables seamless communication, allowing civilians to request essential supplies and rescue agencies to efficiently coordinate and deliver aid. With Revive, we aim to bridge critical gaps during disasters, fostering collaboration and ensuring timely support for those in need.              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="user">
            <img className="pp" src="img/matrixinfinitylogo.png" alt="" />
            <span>Matrix Infinity</span>
          </div>
          <div className="price">
            <h3>Revive Node - ESP32 Wifi enabled  with LoRa transreceiver</h3>
            <br />
          </div>
          <div className="price-amt">
            <span className="price-amts">
            ₹1999.00     
            </span>
            <br />
            <span className="tax">Inclusive of all taxes</span>
            <br/>
            {/* <span><i className="a-icon a-icon-addon p13n-best-seller-badge">#1 Best Seller</i>
            </span> */}
            <p>5k+ bought in past month</p>
          </div>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>Estimated 1-day delivery from your location</span>
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="quantity-container">
            <button className="quantity-btn" onClick={decreaseQuantity}>
              -
            </button>
            <input
              type="text"
              className="quantity-input"
              value={quantity}
              readOnly
            />
            <button className="quantity-btn" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className="Btn-cart">
            <button className="button1">Add to Cart</button>
            <button className="button2">Buy Now</button>
          </div>

          <p className="scroll">Scroll down for more info</p>
        </div>
      </div>
    </div>
  );
};
