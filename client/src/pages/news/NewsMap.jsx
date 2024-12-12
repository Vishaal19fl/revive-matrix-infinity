import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NewsMap.scss';

const NewsMap = ({ newsItems }) => {
  const extractCoordinates = (item) => ({
    lat: item.coordinates?.lat || 0,
    lng: item.coordinates?.lng || 0,
  });

  const useRadarEffect = () => {
    const [radius, setRadius] = useState(0); // Single radius for moving circles

    useEffect(() => {
      const interval = setInterval(() => {
        setRadius((prev) => (prev >= 30000 ? 0 : prev + 1500)); // Expand and reset
      }, 100); // Adjust animation speed
      return () => clearInterval(interval);
    }, []);

    return radius;
  };

  const radarRadius = useRadarEffect();

  // Generate random radius for stable outer circles
  const [randomRadii, setRandomRadii] = useState({});

  useEffect(() => {
    const radii = {};
    Object.values(newsItems).forEach((category) =>
      category.forEach((data, index) => {
        radii[index] = Math.floor(Math.random() * (50000 - 20000 + 1)) + 20000; // Generate random radius
      })
    );
    setRandomRadii(radii);
  }, [newsItems]);

  return (
    <div className="news-map-container">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.values(newsItems).map((category) =>
          category.map((data, index) => {
            const { lat, lng } = extractCoordinates(data);
            const stableRadius = randomRadii[index] || 20000; // Use pre-generated random radius

            return (
              <React.Fragment key={index}>
                {/* Stable Outer Circle */}
                <Circle
                  center={[lat, lng]}
                  radius={stableRadius} // Fixed random radius for the outer circle
                  pathOptions={{
                    color: 'red',
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    opacity: 0.5,
                    dashArray: '5,10', // Dashed circle for the boundary
                  }}
                />

                {/* Animated Inner Circle */}
                <Circle
                  center={[lat, lng]}
                  radius={radarRadius} // Dynamic radius for moving circle
                  pathOptions={{
                    color: 'red',
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    opacity: 1 - radarRadius / 30000, // Fade as the circle expands
                  }}
                />

                {/* Marker */}
                <Marker
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
                    <strong>{data.headline || data.content || data.data}</strong>
                    <br />
                    <br />
                    <strong>Location : </strong> {data.location}
                    <br />
                    <br />
                    <em>{new Date(data.timestamp).toLocaleString()}</em>
                    <br />
                    {data.link && <a href={data.link} target="_blank" rel="noopener noreferrer">Read more</a>}
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })
        )}
      </MapContainer>
    </div>
  );
};

export default NewsMap;
