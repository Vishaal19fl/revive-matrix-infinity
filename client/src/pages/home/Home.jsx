import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";

import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards,cards2, cards3, gigs, logistics, projects, projects2, projects3, shelters } from "../../data";
import { Link, useLocation } from "react-router-dom";
import CatCard2 from "../../components/catCard2/CatCard2";
import Dashboard from "../../components/dashboard/Dashboard";
import PricingClient from "../../components/pricingClient/PricingClient";
import { ServiceCard2 } from "../../components/serviceCard2/ServiceCard2";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import Marquee from "react-fast-marquee";
import { ShelterCard } from "../../components/shelterCard/ShelterCard";
import { LogisticCard } from "../../components/logisticCard/LogisticCard";
import NewsSlider from "../../components/newsSlider/NewsSlider";
import ReportForm from "../../components/reportForm/ReportForm";


function Home() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef(0);
  const maxRef = useRef(10000);

  const { search } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const imageUrls = [
    "https://i.ytimg.com/vi/Fwb8VRyqAU4/maxresdefault.jpg",
    "./img/revivead.png",
    "./img/disasterrelief.png",
    "./img/revivead.png",
    
    
  ];

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="home">

      {currentUser?.isSeller ? <Featured /> : <Featured />} 
      {/* <div className="slide-title1">
        <h2>Revolutionizing Disaster Relief</h2>
      </div> */}
      <div className="marquee-section" >
      <Marquee className="marquee" autoFill speed={20}>
        <div className="gallery">
          {imageUrls.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt=""
                width={300}
                height={320}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </Marquee>
      
      </div>
      {currentUser?.isLogistics && <div className="slide-title1">
      <h2>Available deliveries</h2>
      
      </div>}
      <NewsSlider />

      {currentUser?.isLogistics &&<div className="donation-cards">
      <Slide slidesToShow={4} arrowsScroll={1}>
      {logistics.map((logistic)=>(
            <LogisticCard key={logistic.id} item={logistic}/>
          ))}
      </Slide>
      <Link className="link" to="/deliveries">
       <button className="btn2">View All</button></Link>
      </div>
       }  
     

      {!currentUser?.isLogistics && <div className="slide-title1">
      {currentUser?.isSeller ? <h2>Donate now </h2> : <h2>Donate now </h2> }
      
      </div>}
      

      {!currentUser?.isLogistics && <div className="donation-cards">
      <Slide slidesToShow={4} arrowsScroll={1}>
      {gigs.map((gig)=>(
            <ServiceCard2 key={gig.id} item={gig}/>
          ))}
      </Slide>
      <Link className="link" to="/gigs?cat=">
      <button className="btn2">View All</button></Link>
      </div>}
      

      {!currentUser?.isLogistics &&<div className="slide-title1">
      <h2>Requests from Shelters or camps</h2>
      
      </div>}

      {!currentUser?.isLogistics &&<div className="donation-cards">
      <Slide slidesToShow={4} arrowsScroll={1}>
      {shelters.map((gig)=>(
            <ShelterCard key={gig.id} item={gig}/>
          ))}
      </Slide>
      </div> }

      

     

      {/* <div className="slide-title">
        <h2>Categories</h2>
      </div>
      <Slide slidesToShow={5} arrowsScroll={1}>
        {cards2.map((card) => (
          <CatCard2 key={card.id} card={card} />
        ))}
      </Slide> */}

      

      {/* <div className="slide-title2">
      {currentUser?.isSeller ? <h2>Featured LifeLines </h2> : <h2>Featured Freelancers 🔒 </h2> }
      
      </div>
      {currentUser?.isSeller ? <Slide slidesToShow={5} arrowsScroll={1}>
        {cards3.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> :
      <Slide slidesToShow={5} arrowsScroll={1}>
      {cards.map((card) => (
        <CatCard key={card.id} card={card} onClick={() => {}} />
      ))}
    </Slide>
     } */}

      

       {/* <div className="slide-title2">
       {currentUser?.isSeller ? <h2>Mentorship Services 🔒</h2> : <h2>Featured Services</h2> }
      </div> 
      {currentUser?.isSeller ? <Slide slidesToShow={4} arrowsScroll={1}>
        {projects2.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> : <Slide slidesToShow={4} arrowsScroll={1}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> } */}

      

      
{!currentUser?.isSeller && !currentUser?.isLogistics && (
  <div className="features">
    <div className="container">
      <div className="item">
        <h1>Join Us in Revolutionizing Disaster Relief with LifeLine</h1>
        <div className="title">
          Reliable Communication
        </div>
        <p>
          LifeLine ensures reliable communication in disaster-stricken areas by deploying resilient LoRa mesh networks, connecting those in need with rescue agencies and volunteers.
        </p>
        <div className="title">
          Empowering Communities
        </div>
        <p>
          Our platform empowers communities by providing a user-friendly mobile app for requesting assistance, ensuring no one is left without help during critical times.
        </p>
        <div className="title">
          Seamless Coordination
        </div>
        <p>
          LifeLine facilitates seamless coordination between rescue agencies, donors, and logistics providers, optimizing resource allocation and response efforts through real-time data and AI-powered insights.
        </p>
        <button className="btn1">Register as a Volunteer</button>
      </div>
      <div className="item">
        <video src="/img/lifelinevid4.mp4" autoPlay muted loop playsInline />
      </div>
    </div>
  </div>
  
)}


     

      {(currentUser?.isSeller || currentUser?.isLogistics) && (
  <div className="features dark">
    <div className="container">
      <div className="item">
        <h1>Enhance Disaster Response with <strong>Revive.</strong></h1>
        <img src="./img/revivead.png" alt="" />
      </div>
      <div className="item">
        <h1>
          Revive: Empowering Communities, Connecting Responders, Saving Lives
        </h1>
        <p>
          Ready to revolutionize disaster relief efforts? Discover LifeLine, where we enhance communication and resource coordination during critical times.
        </p>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Deploy resilient LoRa mesh networks for reliable communication
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Use our mobile app to send and receive emergency assistance requests
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Coordinate effectively with real-time data and AI-powered optimization
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Manage resources and donations seamlessly through our platform
        </div>
        <Link className="link" to="/product"><button 
        
        onclick="window.location.href='/product'">
        Buy Now
      </button></Link>
      </div>
     
    </div>
  </div>
)}

      

<div className="reportform">
    <ReportForm/>
  </div>
  
      
      
    </div>
  );
}

export default Home;
