import React from 'react'
import "./ShelterCard.scss"
import { Link } from 'react-router-dom'

export const ShelterCard = ({item}) => {
  return (
    <Link to="/shelterdetails/123" className='link'>
        <div className="ShelterCard">
            
            <div className="info">
                <div className="user">
                    <img src={item.pp} alt="" />
                    <span>{item.username}</span>
                </div>
                <p>{item.desc}</p>
                <div className="star">
                    
                    <span>From {item.star}</span>
                </div>
            </div>
            <hr/>
            <div className="details">
                <button className="btn1">Donate Now</button>
                
            </div>
        </div>
    </Link>
  )
}
