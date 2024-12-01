import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const GeographyChart = () => {
  // Predefined locations: Chennai and Odisha
  const locations = [
    {
      name: "Chennai",
      coordinates: [13.0827, 80.2707], // Latitude and Longitude of Chennai
    },
    {
      name: "Odisha",
      coordinates: [20.9517, 85.0985], // Latitude and Longitude of Odisha
    },
  ];

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={3.5} style={{ width: "100%", height: "200px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location.coordinates}
          icon={
            new Icon({
              iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
            })
          }
        >
          <Popup>
            <strong>{location.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GeographyChart;
