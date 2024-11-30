import React from 'react'
import "./ServiceCard2.scss"
import { Link } from 'react-router-dom'

export const ServiceCard2 = ({item}) => {
  return (
    <Link to="/gig/123" className='link'>
        <div className="gigCard1">
            <img src={item.img} alt="" />
            <div className="info">
                <div className="user">
                    <img src={item.pp} alt="" />
                    <span>{item.username}</span>
                </div>
                <p>{item.desc}</p>
                <div className="star">
                    
                    
                </div>
            </div>
            <hr/>
            <div className="details">
                <button className="btn1">Donate Now</button>
                <div className="price">
                    <span>Requested by</span>
                    <h2>{item.price}</h2>
                </div>
            </div>
        </div>
    </Link>
  )
}
