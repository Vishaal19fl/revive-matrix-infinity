import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NewsMap.scss'; // Import the SCSS file

const NewsMap = ({ newsItems }) => {
  const extractCoordinates = (item) => {
    return {
      lat: item.location?.lat || 0,
      lng: item.location?.lng || 0,
    };
  };

  return (
    <div className="news-map-container">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.values(newsItems).map((category) => {
          return category.map((data, index) => {
            const { lat, lng } = extractCoordinates(data);

            return (
              <Marker
                key={index}
                position={[lat, lng]}
                icon={
                  new Icon({
                    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                  })
                }
              >
                <Popup className="popup-content">
                  <strong>{data.headline || data.content}</strong>
                  <br />
                  <em>{new Date(data.timestamp).toLocaleString()}</em>
                  <br />
                  {data.link && <a href={data.link} target="_blank" rel="noopener noreferrer">Read more</a>}
                </Popup>
              </Marker>
            );
          });
        })}
      </MapContainer>
    </div>
  );
};

export default NewsMap;
