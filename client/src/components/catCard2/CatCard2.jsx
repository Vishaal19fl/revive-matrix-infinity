import React from "react";
import { Link } from "react-router-dom";
import "./CatCard2.scss";

function CatCard2({ card }) {
  return (
    <Link to="/gigs?cat=web">
      <div className="catCard2">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}
export default CatCard2;
