import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  return (
    <div className='slide'>
      <div className="container">
        <Slider slidesToShow={isMobile ? 1 : slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
