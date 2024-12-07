
import React, { useEffect, useRef } from 'react';

const GoogleMapWithAutocomplete = () => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  let map;
  let autocomplete;
  let directionsService;
  let directionsRenderer;
  let trafficLayer;

  useEffect(() => {
    // This function will be called when the Google Maps API is loaded
    const initMap = () => {
      // Create the map centered on a default location
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 12.9716, lng: 80.2760 }, // Default to Chennai, India
        zoom: 10,
      });

      // Add a traffic layer to the map
      trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);

      // Create the autocomplete object and bind it to the input field
      autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.bindTo('bounds', map);

      // Create the DirectionsService and DirectionsRenderer objects
      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Set up the event listener for when the user selects a place
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("No details available for the input: '" + place.name + "'");
          return;
        }

        // Adjust the map view based on the selected place's geometry
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17); // Zoom to 17 if the place has no viewport
        }

        // Place a marker on the selected location
        new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
        });
      });

      // Get directions from Chennai to Kanchipuram
      const request = {
        origin: 'Chennai, India',
        destination: 'Kanchipuram, India',
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    };

    // Load the Google Maps script asynchronously
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyojzQpahT8hkoehGfi60uczLqgYJfmyC8P&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Attach the script to the body
    document.body.appendChild(script);

    // Attach the callback function to the window object
    window.initMap = initMap;

    return () => {
      // Cleanup when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* <input
        ref={inputRef}
        id="pac-input"
        type="text"
        placeholder="Search for a place"
        style={{ marginTop: '10px', width: '300px', padding: '5px', fontSize: '14px' }}
      /> */}
      <div
        ref={mapRef}
        id="map"
        style={{ height: '500px', width: '100%', borderRadius:"10px" }}
      ></div>
    </div>
  );
};

export default GoogleMapWithAutocomplete;
