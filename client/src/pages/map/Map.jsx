import React from 'react';
import './Map.scss'; // Create this file for styling if needed

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com.qa/maps/d/embed?mid=1eUE5xX-BjzX4ewZbnX6EZC8MnMg2ZEY&ehbc=2E312F"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
