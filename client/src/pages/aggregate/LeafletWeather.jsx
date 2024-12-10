import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-side-by-side";

const MapComparison = () => {
  useEffect(() => {
    // Check if the map already exists and destroy it
    const mapContainer = document.getElementById("map");
    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null;
    }

    // Initialize the map centered on India
    const map = L.map("map", {
      center: [20.5937, 78.9629], // Centered on India
      zoom: 5,
    });

    // Base layer 1: OpenStreetMap
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Base layer 2: Watercolor layer
    const watercolorLayer = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
          '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> ' +
          '&mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abcd",
        minZoom: 1,
        maxZoom: 16,
        ext: "jpg",
      }
    );

    // Add slider control for side-by-side comparison
    const sideBySide = L.control
      .sideBySide(watercolorLayer, osmLayer)
      .addTo(map);

    // Add layers to the map
    osmLayer.addTo(map);
    watercolorLayer.addTo(map);

    // Cleanup function to destroy the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default MapComparison;
