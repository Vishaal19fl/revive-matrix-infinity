import React from 'react';
import "./LogisticCard.scss";
import { Link } from 'react-router-dom';

export const LogisticCard = ({ item }) => {
  return (
    <Link to={`/logisticdetails/123`} className='link'>
      <div className="LogisticCard">
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>Donor : {item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <span>From {item.star}</span>
            <span>To Thirumangalam</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <button className="btn1">Accept</button>
          <div className="active-status">
            <span className="active-indicator"></span>
            <span className="active-text">Active</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
