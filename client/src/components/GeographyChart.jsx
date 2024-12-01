import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
      name: "Kanchipuram",
      coordinates: [12.8312, 79.7099], // Latitude and Longitude of Odisha
    },
  ];

  const mapRef = useRef();

  useEffect(() => {
    const loadRouting = async () => {
      const LRM = await import("leaflet-routing-machine");

      const map = mapRef.current;

      if (map) {
        // Add routing control to the map with two waypoints
        LRM.Routing.control({
          waypoints: [
            LRM.latLng(13.0827, 80.2707), // Chennai
            LRM.latLng(20.9517, 85.0985), // Odisha
          ],
          createMarker: () => null, // To prevent markers from appearing at waypoints
        }).addTo(map);
      }
    };

    loadRouting();
  }, []);

  return (
    <MapContainer
      ref={mapRef}
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ width: "100%", height: "200px" }}
    >
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
