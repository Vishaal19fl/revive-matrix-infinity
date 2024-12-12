

// import React, { useEffect, useRef, useState } from 'react';

// const DirectionsMap = () => {
//   const mapRef = useRef(null);
//   const pickupInputRef = useRef(null);
//   const destinationInputRef = useRef(null);
//   const [pickup, setPickup] = useState('');
//   const [destination, setDestination] = useState('');
//   let map;
//   let directionsService;
//   let directionsRenderer;
//   let trafficLayer;
//   let pickupAutocomplete;
//   let destinationAutocomplete;

//   useEffect(() => {
//     // This function will be called when the Google Maps API is loaded
//     const initMap = () => {
//       // Create the map centered on a default location
//       map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 12.9716, lng: 80.2760 }, // Default to Chennai, India
//         zoom: 10,
//       });

//       // Add a traffic layer to the map
//       trafficLayer = new window.google.maps.TrafficLayer();
//       trafficLayer.setMap(map);

//       // Create the autocomplete object and bind it to the input field
//       autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
//       autocomplete.bindTo('bounds', map);

//       // Create the DirectionsService and DirectionsRenderer objects
//       directionsService = new window.google.maps.DirectionsService();
//       directionsRenderer = new window.google.maps.DirectionsRenderer();
//       directionsRenderer.setMap(map);

//       // Set up the event listener for when the user selects a place
//       pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current);
//       destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInputRef.current);

//       // Set up event listeners for autocomplete selections
//       pickupAutocomplete.addListener('place_changed', () => {
//         const place = pickupAutocomplete.getPlace();
//         if (place.geometry) {
//           setPickup(place.formatted_address || place.name);
//         }
//       });

//       destinationAutocomplete.addListener('place_changed', () => {
//         const place = destinationAutocomplete.getPlace();
//         if (place.geometry) {
//           setDestination(place.formatted_address || place.name);
//         }
//       });

//       // Simulate waterlogging and roadblock markers
//       addCustomMarkers();
//     };

//         // Adjust the map view based on the selected place's geometry
//         if (place.geometry.viewport) {
//           map.fitBounds(place.geometry.viewport);
//         } else {
//           map.setCenter(place.geometry.location);
//           map.setZoom(17); // Zoom to 17 if the place has no viewport
//         }

//         // Place a marker on the selected location
//         new window.google.maps.Marker({
//           position: place.geometry.location,
//           map: map,
//         });
//       });

//       // Get directions from Chennai to Kanchipuram
      
//       const handleShowDirections = () => {
//             const request = {
//                 origin: pickup,
//                 destination: destination,
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//               };
    
//           directionsService.route(request, (result, status) => {
//             if (status === window.google.maps.DirectionsStatus.OK) {
//               directionsRenderer.setDirections(result);
//             } else {
//               console.error('Directions request failed due to ' + status);
//             }
//           });
//       }
    
    
//     // Load the Google Maps script asynchronously
//     const script = document.createElement('script');
//     script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyojzQpahT8hkoehGfi60uczLqgYJfmyC8P&libraries=geometry,places&callback=initMap`;
//     script.async = true;
//     script.defer = true;

//     // Attach the script to the body
//     document.body.appendChild(script);

//     // Attach the callback function to the window object
//     window.initMap = initMap;

    

//   return (
//     <div>
//       <div style={{ marginBottom: '10px' }}>
//         <input
//           ref={pickupInputRef}
//           type="text"
//           placeholder="Enter Pickup Location"
//           style={{ width: '45%', padding: '5px', marginRight: '10px' }}
//         />
//         <input
//           ref={destinationInputRef}
//           type="text"
//           placeholder="Enter Destination"
//           style={{ width: '45%', padding: '5px' }}
//         />
//         <button
//           onClick={handleShowDirections}
//           style={{
//             padding: '6px 12px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             marginLeft: '10px',
//             cursor: 'pointer',
//           }}
//         >
//           Show Directions
//         </button>
//       </div>
//       <div
//         ref={mapRef}
//         id="map"
//         style={{ height: '500px', width: '100%', borderRadius:"10px" }}
//       ></div>
//     </div>
//   );
// };

// export default DirectionsMap;


import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const DirectionsMap = () => {
  const mapRef = useRef(null);
  const pickupInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState('');
  const [mapObjects, setMapObjects] = useState({ directionsService: null, directionsRenderer: null });

  useEffect(() => {
    // Initialize the map
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.2961, lng: 85.8245 }, // Chennai, India
        zoom: 10,
      });

      // Add traffic layer
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(map);

      // Initialize DirectionsService and DirectionsRenderer
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      // Store these objects in state to use them later
      setMapObjects({ directionsService, directionsRenderer });

      // Initialize autocomplete for pickup and destination inputs
      const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current);
      const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInputRef.current);

      // Add listeners to update state on place selection
      pickupAutocomplete.addListener('place_changed', () => {
        const place = pickupAutocomplete.getPlace();
        if (place.geometry) {
          setPickup(place.formatted_address || place.name);
        }
      });

      destinationAutocomplete.addListener('place_changed', () => {
        const place = destinationAutocomplete.getPlace();
        if (place.geometry) {
          setDestination(place.formatted_address || place.name);
        }
      });
    };

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyU90DpF7dwn-eFgHEAQbZNYb5kjz1u8G-u&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  const handleShowDirections = () => {
    if (!pickup || !destination) {
      alert('Please select both pickup and destination!');
      return;
    }

    const { directionsService, directionsRenderer } = mapObjects;

    if (!directionsService || !directionsRenderer) {
      console.error('Directions service or renderer is not initialized.');
      return;
    }

    const request = {
      origin: pickup,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };
  
    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
  
        // Extract distance and duration
        const route = result.routes[0];
        const leg = route.legs[0]; // Get the first leg of the route
        setDistance(leg.distance.text); // Distance in text format (e.g., "12.5 km")
        setDuration(leg.duration.text); // Duration in text format (e.g., "25 mins")
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  return (
    <div>
      <Box m="30px" mb="-20px">
      <Header title="View Directions" subtitle="Enter the locations to view optimal route" titleSize="h4" />
      </Box>
      <div style={{ marginBottom: '10px' }}>
      <input
        id="pickup"
        ref={pickupInputRef}
        type="text"
        placeholder="Enter Pickup Location"
        style={{
          width: '45%',
          margin:'20px 20px',
          marginLeft:'40px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
        <input
          ref={destinationInputRef}
          type="text"
          placeholder="Enter Destination"
          style={{
            width: '45%',
            margin:'20px 20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
        <button
          onClick={handleShowDirections}
          style={{
            padding: '6px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '25px',
            cursor: 'pointer',
            marginBottom:'10px'
          }}
        >
          Show Optimal Route
        </button>
      </div>
      {distance && duration && (
        <div
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          fontSize: '20px',
          
          color: '#333',
          textAlign: 'center',
          backgroundColor: '#d9f2ff', // Light sky-blue background
          border: '1px solid #b3e6ff', // Slightly darker border
          borderRadius: '8px',
          padding: '15px',
          margin:'15px 60px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        >
          <strong>Distance :</strong> {distance} <br />
          <strong>Estimated Time : </strong> {duration}
        </div>
      )}
      <div
        ref={mapRef}
        id="map"
        style={{ height: '600px', width: '95%', borderRadius: '10px', margin:"auto", display:'flex', alignItems:'center', justifyContent:'center' }}
      ></div>
    </div>
  );
};

export default DirectionsMap;

