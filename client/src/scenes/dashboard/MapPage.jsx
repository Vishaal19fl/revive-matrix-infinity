import React, { useEffect, useRef } from 'react';

const MapPage = ({ lat, lng }) => {
  const mapRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyU90DpF7dwn-eFgHEAQbZNYb5kjz1u8G-u&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => initMap(lat, lng);

    document.body.appendChild(script);
  }, [lat, lng]);

  const initMap = (lat, lng) => {
    new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
    });
  };

  return (
    <div id="map" ref={mapRef} style={{ height: '600px', width: '95%', borderRadius: '10px', margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
  );
}

export default MapPage;
