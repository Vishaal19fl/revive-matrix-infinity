import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const disasterZones = [
    {
      name: "Flood Zone - Kolkata",
      location: [22.5726, 88.3639], // Kolkata
      disaster: 'waves', // Flood-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
    },
    {
      name: "Cyclone Zone - Mumbai",
      location: [19.0760, 72.8777], // Mumbai
      disaster: 'cloud', // Cyclone-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/4834/4834559.png", // Cyclone icon
    },
    {
      name: "Heatwave Zone - Delhi",
      location: [28.6139, 77.2090], // Delhi
      disaster: 'fire', // Heatwave-related
      iconUrl: "https://static-00.iconduck.com/assets.00/fire-icon-379x512-bfkr7npz.png", // Fire icon
    },
    {
      name: "Heavy Rain Zone - Chennai",
      location: [13.0827, 80.2707], // Chennai
      disaster: 'rain', // Rain-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1959/1959334.png", // Rain icon
    },
    {
      name: "Cyclone Zone - Puducherry",
      location: [11.9416, 79.8083], // Puducherry
      disaster: 'cloud', // Cyclone-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/4834/4834559.png", // Cyclone icon
    },
    {
      name: "Flood Zone - Kanchipuram",
      location: [12.8344, 79.7031], // Kanchipuram
      disaster: 'waves', // Flood-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
    },
    {
      name: "Flood Zone - Thiruvallur",
      location: [13.1488, 79.9790], // Thiruvallur
      disaster: 'waves', // Flood-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
    },
    {
      name: "Cyclone Zone - Odisha",
      location: [20.9517, 85.0985], // Odisha (Bhubaneswar)
      disaster: 'cloud', // Cyclone-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/4834/4834559.png", // Cyclone icon
    },
    {
      name: "Flood Zone - Visakhapatnam",
      location: [17.6869, 83.2185], // Visakhapatnam
      disaster: 'waves', // Flood-related
      iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
    },
  ];

const Aggregate = () => {
  const [map, setMap] = useState(null);

  // Custom Icon generator for each disaster marker
  const getIcon = (iconUrl) => {
    return new Icon({
      iconUrl: iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={[20.5937, 78.9629]} // Center over India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        />
        {/* <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        /> */}

        {/* Add disaster markers */}
        {disasterZones.map((zone, index) => (
          <Marker
            key={index}
            position={zone.location}
            icon={getIcon(zone.iconUrl)}
          >
            <Popup>
              <div>
                <h3>{zone.name}</h3>
                <p>Located at: {zone.location.join(", ")}</p>
                <p>Disaster Type: {zone.disaster}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Aggregate;
