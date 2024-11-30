import React from "react";
import "./Marquee.scss";

const Marquee = ({ images, speed = 15 }) => {
  // Ensure at least two sets of images for seamless looping
  const extendedImages = images.length > 1 ? [...images, ...images] : images;

  return (
    <div className="marquee">
      <div className="marquee__inner" style={{ animationDuration: `${speed * extendedImages.length}s` }}>
        {extendedImages.map((imageUrl, index) => (
          <div key={index} className="marquee-item">
            <img src={imageUrl} alt={`Gallery Image ${index}`} className="marquee-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
