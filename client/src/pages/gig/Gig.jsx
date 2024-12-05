import React, { useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import Donation from "../../components/donation/Donation";



function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donationDetails, setDonationDetails] = useState({ item: "", quantity: 0 });

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const handleDonationConfirm = (details) => {
    setDonationDetails(details);
    navigate("/checkout", { state: { donationDetails: details, location: "Meenambakkam", rescueagency: "Anna Nagar", pp:"https://i.pinimg.com/originals/0e/21/3b/0e213bc567b6ed03e3a2de4404416ecc.gif" } });
  };

  
  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            {/* <span className="breadcrumbs">
              Memento {">"} Jewellery {">"}
            </span> */}
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                
              </div>
            )}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31101.72347071431!2d80.16853235!3d12.99004395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52609ef059c837%3A0x3cd190a67366865b!2sMeenambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719721425434!5m2!1sen!2sin"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '90%', border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
            <h2>Meesage Received from LifeLine</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Rescue Agency</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.desc}</h3>
              <h2>Quantity : {data.price}</h2>
            </div>
            <p><strong>Request from : </strong>{data.delLocation}</p>
            <div className="details">
              <div className="item">
                {/* <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Minutes</span> */}
              </div>
              
            </div>
            
            
            
            <Donation onConfirm={handleDonationConfirm}/>
           
          </div>

            
          
          
        </div>
      )}
    </div>
  );
}

export default Gig;
