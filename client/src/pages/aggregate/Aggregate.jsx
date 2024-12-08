import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Coordinates for Indian states and cities
const states = [
  { name: "Delhi", location: [28.7041, 77.1025] },
  { name: "Maharashtra", location: [19.7515, 75.7139] },
  { name: "Tamil Nadu - Chennai", location: [13.0827, 80.2707] },
  { name: "Tamil Nadu - Coimbatore", location: [11.0168, 76.9558] },
  { name: "Tamil Nadu - Madurai", location: [9.9252, 78.1198] },
  { name: "Tamil Nadu - Trichy", location: [10.7905, 78.7047] },
  { name: "Odisha - Bhubaneswar", location: [20.2961, 85.8245] },
  { name: "Odisha - Cuttack", location: [20.4625, 85.8828] },
  { name: "Odisha - Puri", location: [19.8135, 85.8312] },
  { name: "Odisha - Rourkela", location: [22.2604, 84.8536] },
  { name: "Andhra Pradesh - Visakhapatnam", location: [17.6868, 83.2185] },
  { name: "Andhra Pradesh - Vijayawada", location: [16.5062, 80.6480] },
  { name: "Telangana - Hyderabad", location: [17.3850, 78.4867] },
  { name: "Goa - Panaji", location: [15.4909, 73.8278] },
  { name: "Karnataka - Bangalore", location: [12.9716, 77.5946] },
  { name: "West Bengal - Kolkata", location: [22.5726, 88.3639] },
  { name: "Rajasthan - Jaipur", location: [26.9124, 75.7873] },
  { name: "Rajasthan - Udaipur", location: [24.5854, 73.7125] },
  { name: "Uttar Pradesh - Agra", location: [27.1767, 78.0081] },
  { name: "Maharashtra - Nagpur", location: [21.1458, 79.0882] },
];

// Weather API configuration
const WEATHER_API_KEY = "2695e658eed725ac5b9d6d0e5ebad582"; // Replace with your API key

// Disaster zones data
const disasterZones = [
  {
    name: "Flood Zone - Kolkata",
    location: [22.5726, 88.3639],
    disaster: 'waves',
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
  },
  {
    name: "Cyclone Zone - Mumbai",
    location: [19.0760, 72.8777],
    disaster: 'cyclone',
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8085/8085932.png", // Cyclone icon
  },
  {
    name: "Heatwave Zone - Delhi",
    location: [28.6139, 77.2090],
    disaster: 'fire',
    iconUrl: "https://png.pngtree.com/png-vector/20220901/ourmid/pngtree-a-simple-vector-icon-displaying-a-thermometer-with-the-sun-indicating-warm-weather-vector-png-image_33568994.png", // Fire icon
  },
  {
    name: "Heavy Rain Zone - Chennai",
    location: [13.0827, 80.2707],
    disaster: 'rain',
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1959/1959334.png", // Rain icon
  },
  {    name: "Avalanche Zone - Himachal Pradesh",
    location: [32.2207, 77.1880], // Himachal Pradesh
    disaster: 'avalanche', // Avalanche-related
    iconUrl: "https://www.pngkey.com/png/full/866-8669719_avalanche-moderate-danger-level-avalanche-danger-icon.png", // Avalanche icon
  },
  {
    name: "Avalanche Zone - Uttarakhand",
    location: [30.0668, 79.0193], // Uttarakhand
    disaster: 'avalanche', // Avalanche-related
    iconUrl: "https://www.pngkey.com/png/full/866-8669719_avalanche-moderate-danger-level-avalanche-danger-icon.png", // Avalanche icon
  },
];

// Map weather descriptions to specific icons
const weatherIcons = {
  clear: "https://cdn-icons-png.flaticon.com/512/3222/3222800.png", // Clear sky icon
  mist: "https://cdn-icons-png.flaticon.com/512/2264/2264658.png", // Mist icon
  fewClouds: "https://cdn-icons-png.flaticon.com/512/252/252035.png", // Few clouds icon
  rain: "https://cdn-icons-png.flaticon.com/512/1959/1959334.png", // Rain icon
  cloud: "https://cdn-icons-png.flaticon.com/512/4834/4834559.png", // Cloud icon
  heatwave: "https://static-00.iconduck.com/assets.00/fire-icon-379x512-bfkr7npz.png", // Heatwave icon
  cyclone: "https://cdn-icons-png.flaticon.com/512/8085/8085932.png", // Cyclone icon
  avalanche: "https://www.pngkey.com/png/full/866-8669719_avalanche-moderate-danger-level-avalanche-danger-icon.png", // Avalanche icon
  haze: "https://cdn-icons-png.flaticon.com/512/616/616542.png"
};

const getWeatherIcon = (description) => {
  if (description.includes("clear sky")) return weatherIcons.clear;
  if (description.includes("mist")) return weatherIcons.mist;
  if (description.includes("few clouds")) return weatherIcons.fewClouds;
  if (description.includes("rain")) return weatherIcons.rain;
  if (description.includes("cloud")) return weatherIcons.cloud;
  if (description.includes("heat")) return weatherIcons.heatwave;
  if (description.includes("haze")) return weatherIcons.haze;
  if (description.includes("cyclone")) return weatherIcons.cyclone;
  if (description.includes("snow") || description.includes("avalanche")) return weatherIcons.avalanche;
  return weatherIcons.cloud; // Default to cloud
};


const Aggregate = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedWeather, setSearchedWeather] = useState(null);

  useEffect(() => {
    // Fetch weather data for all states and cities
    const fetchWeatherData = async () => {
      const promises = states.map(async (state) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${state.location[0]}&lon=${state.location[1]}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const { weather, main, wind } = response.data;
          console.log(response.data);
          return {
            name: state.name,
            location: state.location,
            weather: weather[0].main,
            description: weather[0].description,
            humidity:main.humidity,
            windspeed: wind.speed,
            temp: main.temp,
            iconUrl: getWeatherIcon(weather[0].description),
          };
        } catch (error) {
          console.error(`Error fetching weather for ${state.name}:`, error);
          return {
            name: state.name,
            location: state.location,
            weather: "Unknown",
            description: "Unable to fetch weather data",
            humidity:main.humidity,
            windspeed: wind.speed,
            temp: "N/A",
            iconUrl: weatherIcons.cloud,
          };
        }
      });

      const results = await Promise.all(promises);
      setWeatherData(results);

      console.log(results);

      const bhubaneswarWeather = results.find(state => state.name === "Odisha - Bhubaneswar");
      if (bhubaneswarWeather) {
        setSearchedWeather(bhubaneswarWeather);
      }

      console.log(searchedWeather);
    
    };

    fetchWeatherData();
  }, []);

  

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const { weather, main } = response.data;
      setSearchedWeather({
        name: searchTerm,
        location: [response.data.coord.lat, response.data.coord.lon],
        weather: weather[0].main,
        description: weather[0].description,
        humidity:main.humidity,
        windspeed: wind.speed,
        temp: main.temp,
        iconUrl: getWeatherIcon(weather[0].description),
      });
    } catch (error) {
      console.error("Error fetching weather for search term:", error);
      setSearchedWeather(null);

      console.log(searchedWeather);
    }
  };

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
        zoom={5.3}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        />

        {/* Display weather data markers */}
        {weatherData.map((state, index) => (
          <Marker
            key={index}
            position={state.location}
            icon={getIcon(state.iconUrl)}
          >
            <Popup>
              <div>
                <h3>{state.name}</h3>
                <p>{state.description}</p>
                <p>Humidity : {state.humidity}</p>
                <p>Wind Speed : {state.windspeed}</p>
                <p>Temperature: {state.temp}°C</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Display disaster zone markers */}
        {disasterZones.map((zone, index) => (
          <Marker
            key={index}
            position={zone.location}
            icon={getIcon(zone.iconUrl)}
          >
            <Popup>
              <div>
                <h3>{zone.name}</h3>
                <p>Disaster Type: {zone.disaster}</p>
                <p>Location: {zone.location.join(", ")}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Search Bar */}
      <div className="search-container" style={{ position: 'absolute', top: '210px', left: '40px', zIndex: 1000,  }}>
        <input
          type="text"
          placeholder="Search for a city/state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width:'250px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 15px',
            fontSize: '14px',
            borderRadius: '4px',
            marginLeft: '10px',
            cursor: 'pointer',
            backgroundColor: 'rgb(28, 151, 251)',
            color: 'white',
            
          }}
        >
          Search
        </button>

        {/* Display searched weather */}
        {searchedWeather && (
          <div className="searched-weather" style={{ marginTop: '10px', background:'rgba(255, 255, 255)', padding: '15px',borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'}}>
            <h3>Weather in {searchedWeather.name}</h3>
            <img src={searchedWeather.iconUrl} alt={searchedWeather.weather} width="50" />
            <p>{searchedWeather.weather}</p>
            {/* <p>{searchedWeather.description}</p> */}
            <p><strong>Humidity : </strong>{searchedWeather.humidity}</p>
            <p><strong>Temperature : </strong> {searchedWeather.temp}°C</p>
          </div>
        )}
      </div>

      
      <div className="active-weather">
  <h3>Active Cyclone at Chennai, Tamil Nadu</h3>
  <div className="blinking-light"></div>
</div>

<style jsx>{`
  .active-weather {
    position: fixed;
    display:flex;
    width:100%;
    gap:15px;
    flex-direction:row;
    bottom: 20px;
    z-index: 99999;
    left: 20px;
    background-color: rgb(228, 244, 255);
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    width: 250px;
  }

  .active-weather h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  .blinking-light {
    width: 23px;
    height: 15px;
    background-color: green;
    border-radius: 50%;
    animation: blink 1s infinite alternate;
    margin-top: 3px;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }

  @media (max-width: 768px) {
    .active-weather {
      display: none;
    }
  }
`}</style>




<div className="info-box">
        <h3>Weather Icons</h3>
        <ul>
          <li>
            <img src={weatherIcons.clear} alt="Clear Sky" width="20" height="20" />
            Clear Sky
          </li>
          <li>
            <img src={weatherIcons.mist} alt="Mist" width="20" height="20" />
            Mist
          </li>
          <li>
            <img src={weatherIcons.fewClouds} alt="Few Clouds" width="20" height="20" />
            Few Clouds
          </li>
          <li>
            <img src={weatherIcons.rain} alt="Rain" width="20" height="20" />
            Rain
          </li>
          <li>
            <img src={weatherIcons.cloud} alt="Cloud" width="20" height="20" />
            Cloudy
          </li>
          <li>
            <img src={weatherIcons.heatwave} alt="Heatwave" width="20" height="20" />
            Heatwave
          </li>
          <li>
            <img src={weatherIcons.cyclone} alt="Cyclone" width="20" height="20" />
            Cyclone
          </li>
          <li>
            <img src={weatherIcons.avalanche} alt="Avalanche" width="20" height="20" />
            Avalanche
          </li>
          <li>
            <img src={weatherIcons.haze} alt="Haze" width="20" height="20" />
            Haze
          </li>
        </ul>
      </div>

      <style jsx>{`
        .info-box {
          position: fixed;
          bottom: 20px;
          z-index:99999;
          right: 20px;
          background-color: rgba(255, 255, 255);
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
          width: 250px;
        }

        .info-box h3 {
          margin-top: 0;
          margin-bottom:10px;
          font-size: 18px;
          font-weight: bold;
        }

        .info-box ul {
          list-style-type: none;
          padding: 0;
        }

        .info-box li {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }

        .info-box li img {
          margin-right: 10px;
        }
          @media (max-width: 768px) {
  .info-box {
    display: none;
  }
      `}</style>
    </div>
  );
};

export default Aggregate;


// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const disasterZones = [
//   {
//     name: "Flood Zone - Kolkata",
//     location: [22.5726, 88.3639], // Kolkata
//     disaster: 'waves', // Flood-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
//   },
//   {
//     name: "Cyclone Zone - Mumbai",
//     location: [19.0760, 72.8777], // Mumbai
//     disaster: 'cyclone', // Cyclone-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8085/8085932.png", // Cyclone icon
//   },
//   {
//     name: "Heatwave Zone - Delhi",
//     location: [28.6139, 77.2090], // Delhi
//     disaster: 'fire', // Heatwave-related
//     iconUrl: "https://png.pngtree.com/png-vector/20220901/ourmid/pngtree-a-simple-vector-icon-displaying-a-thermometer-with-the-sun-indicating-warm-weather-vector-png-image_33568994.png", // Fire icon
//   },
//   {
//     name: "Heavy Rain Zone - Chennai",
//     location: [13.0827, 80.2707], // Chennai
//     disaster: 'rain', // Rain-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/1959/1959334.png", // Rain icon
//   },
//   {
//     name: "Cyclone Zone - Puducherry",
//     location: [11.9416, 79.8083], // Puducherry
//     disaster: 'cyclone', // Cyclone-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8085/8085932.png", // Cyclone icon
//   },
//   {
//     name: "Flood Zone - Kanchipuram",
//     location: [12.8344, 79.7031], // Kanchipuram
//     disaster: 'waves', // Flood-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
//   },
//   {
//     name: "Flood Zone - Thiruvallur",
//     location: [13.1488, 79.9790], // Thiruvallur
//     disaster: 'waves', // Flood-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
//   },
//   {
//     name: "Cyclone Zone - Odisha",
//     location: [20.9517, 85.0985], // Odisha (Bhubaneswar)
//     disaster: 'cyclone', // Cyclone-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8085/8085932.png", // Cyclone icon
//   },
//   {
//     name: "Flood Zone - Visakhapatnam",
//     location: [17.6869, 83.2185], // Visakhapatnam
//     disaster: 'waves', // Flood-related
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/8983/8983230.png", // Flood icon
//   },
//   {
//     name: "Avalanche Zone - Himachal Pradesh",
//     location: [32.2207, 77.1880], // Himachal Pradesh
//     disaster: 'avalanche', // Avalanche-related
//     iconUrl: "https://www.pngkey.com/png/full/866-8669719_avalanche-moderate-danger-level-avalanche-danger-icon.png", // Avalanche icon
//   },
//   {
//     name: "Avalanche Zone - Uttarakhand",
//     location: [30.0668, 79.0193], // Uttarakhand
//     disaster: 'avalanche', // Avalanche-related
//     iconUrl: "https://www.pngkey.com/png/full/866-8669719_avalanche-moderate-danger-level-avalanche-danger-icon.png", // Avalanche icon
//   },
// ];

// const Aggregate = () => {
//   const [map, setMap] = useState(null);

//   // Custom Icon generator for each disaster marker
//   const getIcon = (iconUrl) => {
//     return new Icon({
//       iconUrl: iconUrl,
//       iconSize: [32, 32],
//       iconAnchor: [16, 32],
//       popupAnchor: [0, -32],
//     });
//   };

//   return (
//     <div style={{ height: '100vh' }}>
//       <MapContainer
//         center={[20.5937, 78.9629]} // Center over India
//         zoom={5}
//         style={{ height: '100%', width: '100%' }}
//         whenCreated={setMap}
//       >
//         <TileLayer
//           url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//         />
//         {/* <TileLayer
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//         /> */}

//         {/* Add disaster markers */}
//         {disasterZones.map((zone, index) => (
//           <Marker
//             key={index}
//             position={zone.location}
//             icon={getIcon(zone.iconUrl)}
//           >
//             <Popup>
//               <div>
//                 <h3>{zone.name}</h3>
//                 <p>Located at: {zone.location.join(", ")}</p>
//                 <p>Disaster Type: {zone.disaster}</p>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default Aggregate;