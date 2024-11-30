import React from "react";
import "./ServiceCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const ServiceCard = ({ item }) => {
  
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
      <img src={item.cover || "https://www.henryford.com/-/media/project/hfhs/henryford/henry-ford-blog/images/mobile-interior-banner-images/2020/06/food-bank-what-to-give.jpg?h=600&iar=0&w=640&hash=82575AABA57B2229A9030A24CAB6748C"} alt="" />
        <div className="info">
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.title}</p>
          <div className="star">
            {/* <img src="./img/star.png" alt="" /> */}
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
        <button className="btn1">Donate Now</button>
          <div className="price">
            <span>Quantity</span>
            <h2>{item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
