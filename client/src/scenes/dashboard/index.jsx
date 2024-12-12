import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Chip, IconButton, Typography, useTheme, useMediaQuery, List, ListItem, Card, CardContent, Divider } from "@mui/material";
import { tokens } from "../../theme";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { ColorModeContext } from "../../theme";
import PendingIcon from "@mui/icons-material/Pending";
import InventoryIcon from "@mui/icons-material/Inventory";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ProgressCircle from "../../components/ProgressCircle";
import "./dashboard1.scss"
import LocalShipping from '@mui/icons-material/LocalShipping';
import Sidebar from '../global/Sidebar';
import NewsSlider from '../../components/newsSlider/NewsSlider';
import Marquee from 'react-fast-marquee';
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import useSound from 'use-sound'; 
import buzzerSound from './buzzer.wav';

const Dashboard1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [ocrData, setOcrData] = useState([]);
  const [isLoading2, setIsLoading] = useState(true);
  const [error2, setError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [latestData, setLatestData] = useState([]);
const mapRef = useRef(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};



  const getSeverityColor = (severity) => {
    const lowercaseSeverity = severity?.toLowerCase();
    switch(lowercaseSeverity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
      default:
        return 'success';
    }
  }
  const { data: inventoryData, isLoading : isLoading1, error: error1 } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => newRequest.get("/inventory").then((res) => res.data),
  });
  useEffect(() => {
    if (inventoryData) {
      console.log(inventoryData); // Log inventoryData after it has been fetched
    }
  }, [inventoryData]);

  const inventoryItems = Array.isArray(inventoryData?.inventoryItems) ? inventoryData.inventoryItems : [
    { itemName: "Item A", count: 20 },
    { itemName: "Item B", count: 15 },
    { itemName: "Item C", count: 10 },
    { itemName: "Item D", count: 5 },
  ];
console.log(inventoryItems);
const [isBlinking, setIsBlinking] = useState(false);
  const [playBuzzer] = useSound(buzzerSound);

  



  const handleRefresh = () => {
    setLatestData(ocrData);
    setIsBlinking(true);
    playBuzzer();
    setShowPopup(true);

    setTimeout(() => {
      setIsBlinking(false);
    }, 8000); // Red blink duration in milliseconds
  };
console.log(ocrData[0])
const handleClosePopup = () => setShowPopup(false);
  
  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newRequest.get('/ocrdata'); 
        console.log('API response:', response.data.ocrData.length); 
        setOcrData(response.data.ocrData || []); 
      } catch (error) {
        console.error('Error fetching OCR data:', error);
      }
    };

    fetchNews();


  }, []);

  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];
  const donationCount = orders.length;
  const recentDonations = orders.slice(-6);
  const activeDisasters = ocrData.length;
  const severeDisasters = ocrData.filter((item) => item.severity === "high").length;
  const uniqueLocations = new Set(ocrData.map((item) => item.location)).size;


  const processData = (data) => {
    const counts = {
      High: 0,
      Medium: 0,
      Low: 0,
    };

    data.forEach((item) => {
      if (item.severity === "high") {
        counts.High++;
      } else if (item.severity === "medium") {
        counts.Medium++;
      } else if (item.severity === "low") {
        counts.Low++;
      }
    });

    return [
      { severity: "High", count: counts.High },
      { severity: "Medium", count: counts.Medium },
      { severity: "Low", count: counts.Low },
    ];
  };

  const chartData = processData(ocrData);
  const pinnedLocations = [
    {
      location: "Odisha",
      disaster_type: "Flood",
      severity: "high",
      timestamp: "2024-12-06 10:30:00",
      report: "Severe flooding due to incessant rains has affected several districts in Odisha, causing widespread damage."
    },
    {
      location: "Chennai",
      disaster_type: "Cyclone",
      severity: "medium",
      timestamp: "2024-12-07 08:15:00",
      report: "Cyclone impact in Chennai led to power outages and tree falls in the coastal areas."
    }
  ];
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyU90DpF7dwn-eFgHEAQbZNYb5kjz1u8G-u&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;

    document.body.appendChild(script);
  }, []);

  const initMap = (coordinates) => {
    if (coordinates) {
      const { lat, lng } = coordinates;
      window.open(`https://maps.gomaps.pro/maps?q=${lat},${lng}&z=15`, '_blank');
    }
  };

  const handleMapPopup = (coordinates) => {
    initMap(coordinates);
  };
  
  const textArray = [
    "Severe weather warning: Heavy rainfall expected tomorrow.",
    "Flood alert: Evacuate low-lying areas immediately.",
    "Earthquake detected: Stay indoors and protect yourself.",
    "Tsunami warning: Move to higher ground immediately.",
    "Emergency helpline: Dial 12345 for assistance.",
    "Heatwave alert: Stay hydrated and avoid outdoor activities.",
    "Shelter locations: Nearest relief camp is at XYZ Community Center.",
    "Power outage expected: Prepare with emergency supplies.",
    "Road closures: Avoid Route 56 due to landslides.",
    "Stay tuned: Follow official channels for updates.",
  ];
  
  

  return (
    <Box display="flex">
      {isBlinking && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            zIndex: 9999,
            animation: 'blink 0.5s alternate infinite',
          }}
        ></div>
      )}
      
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <Modal
        isOpen={showMapModal}
        onRequestClose={() => setShowMapModal(false)}
        contentLabel="Map Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            height: '600px',
            width: '95%',
            margin: 'auto',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <div
        ref={mapRef}
        id="map"
        style={{ height: '600px', width: '95%', borderRadius: '10px', margin:"auto", display:'flex', alignItems:'center', justifyContent:'center' }}
      ></div>
      </Modal>
      {/* SIDEBAR */}
      <Sidebar/>

      <Box flexGrow={1} m="30px">
      {/* HEADER */}
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center">
        <Header title="ADMIN DASHBOARD" subtitle="Welcome to your dashboard" titleSize="h4" />
        
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {/* <Box mb={4}>
          <NewsSlider/>
        </Box> */}

<Box mt={isMobile ? '20px' : '0'}>
<Button
    onClick={handleRefresh}
    startIcon={<RefreshIcon />}
    sx={{
      marginRight: "10px",
      marginBottom:"20px",
      backgroundColor: colors.greenAccent[700],
      color: colors.grey[100],
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
    }}
  >
    Refresh
  </Button>
  {/* <Button
    onClick={() => navigate('/donationpage')}
    sx={{
      backgroundColor: colors.blueAccent[700],
      color: colors.grey[100],
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
      mb: "20px",
    }}
  >
    Make Donation
  </Button> */}
  
</Box>

      </Box>
      <Box display="grid" mb="20px" gap="20px">
  <div className="marquee-section" style={{overflow:"hidden"}}>
  <div class="breaking-news-label">Breaking News</div>
  <Marquee className="marquee" autoFill speed={20}>
  <div className="text-gallery">
    {ocrData.map((data, index) => (
      <div key={index} className="text-gallery-item">
      <div className="blinking-lights"></div>
      <p
        className="gallery-text"
        style={{
          color: data.severity?.toLowerCase() === "high" ? "red" :
                 data.severity?.toLowerCase() === "medium" ? "orange" :
                 data.severity?.toLowerCase() === "low" ? "green" :
                 "black" // Default color if severity is undefined
        }}
        onClick={() => handleMapPopup(data.coordinates)}
      >
        {data.data} {/* Replace with desired property */}
      </p>
    </div>
    ))}
  </div>
</Marquee>

  </div>
</Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? '1fr' : 'repeat(12, 1fr)'}
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
  borderRadius: "15px",
  backgroundImage: "linear-gradient(to bottom right, #f0f0f6, #eaf6fb)", // Sky blue gradient
  boxShadow: `
    8px 8px 16px rgba(0, 0, 0, 0.15), 
    -8px -8px 16px rgba(255, 255, 255, 0.9)
  `, // Dual shadow for 3D effect
  border: "none", // Neomorphism often avoids solid borders
}}

>
          <StatBox
            title={ activeDisasters}
            subtitle="Number of Data Collected"
            progress="0.75"
            increase="+14%"
            
            icon={
              <WarningAmberOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    borderRadius: "15px",
    background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <StatBox
            title={severeDisasters}
            subtitle="Number of Severe Disasters"
            progress="0.50"
            increase="+21%"
            icon={
              <InventoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    borderRadius: "15px",
    background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <StatBox
            title={uniqueLocations}
            subtitle="Number of Locations"
            progress="0.30"
            increase="+5%"
            icon={
              <LocationOnOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 3'}
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    borderRadius: "15px",
    background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <StatBox
            title="14"
            subtitle="Number of Rescue Agencies"
            progress="0.80"
            increase="+43%"
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 12'}
  gridRow="span 2"
  sx={{
    borderRadius: "15px",
    background: '#f0f0f6', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
    padding: '16px', // Additional padding for spacing inside the box
    display: 'flex', // Display as flex to center content vertically
    flexDirection: 'column', // Align content in a column direction
    gap: '16px' // Space between items inside the box
  }}
>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '10px'
    }}
  >
    <Typography
      variant="h4"
      sx={{
        color: '#4a4a68',
        fontWeight: 700,
        letterSpacing: '0.5px',
        marginLeft: '20px',
        marginTop: '10px'
      }}
    >
      Latest Disaster News
    </Typography>
  </Box>
  <Card 
      sx={{ 
        width: '100%', 
        maxHeight: '400px', 
        overflow: 'auto',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <List 
          sx={{ 
            padding: 0,
            margin: 0 
          }}
        >
          {ocrData.map((dataItem, index) => (
            <React.Fragment key={dataItem._id.$oid}>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  padding: '16px',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: '120px',
                    height: '100px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginRight: '16px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <img 
                    src={
                      dataItem.disaster_type === 'Cyclone' 
                        ? "https://upload.wikimedia.org/wikipedia/commons/b/bc/Low_pressure_system_over_Iceland.jpg"
                        : "https://www.extracobanks.com/sites/default/files/styles/open_graph/public/2022-09/aerial-view-of-flooded-houses-and-rescue-vehicles-2022-01-17-17-11-53-utc.jpg.webp?itok=59zSY5eh"
                    } 
                    alt="Disaster" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }} 
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#333',
                      lineHeight: 1.6,
                      marginBottom: '8px',
                      '& strong': {
                        color: '#2c3e50',
                        marginRight: '8px',
                        display: 'inline-block',
                        minWidth: '100px'
                      }
                    }}
                  >
                    <strong>Location:</strong> {dataItem.location}<br />
                    <strong>Disaster Type:</strong> {dataItem.disaster_type}<br />
                    <strong>News Source:</strong> {dataItem.news_source}<br />
                    <strong>Data:</strong> {dataItem.data}<br />
                    <strong>Timestamp:</strong> {new Date(dataItem.timestamp).toLocaleString()}
                  </Typography>
                  
                  {/* Severity Chip */}
                  <Chip 
                    icon={<WarningAmberIcon />} 
                    label={`Severity: ${capitalizeFirstLetter(dataItem.severity)}`} 
                    color={getSeverityColor(dataItem.severity)}
                    size="medium"
                    sx={{ 
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        marginRight: '4px'
                      }
                    }}
                  />
                </Box>
              </ListItem>
              {index < ocrData.length - 1 && (
                <Divider 
                  sx={{ 
                    borderColor: '#e0e0e0', 
                    margin: '0 16px' 
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
</Box>


        {/* ROW 2 */}
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 8'}
  gridRow="span 2"
  sx={{
    borderRadius: "15px",
    background: '#f0f0f6', // Light gray for neomorphism background
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `, // Dual shadow for 3D effect
    border: "none", // Neomorphism often avoids solid borders
  }}
>
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mb={isMobile ? '20px' : '0'}>
              <Typography
                variant="h4"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Disaster Severity
              </Typography>
              <Typography
                variant="h5"
               
                color={colors.greenAccent[500]}
              >
                Statistics
              </Typography>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          
          <Box height="250px" mt="-20px">
            <BarChart ocrData={ocrData} isDashboard={true} />
          </Box>
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 4'}
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  overflow="auto"
>
<Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            borderRadius: "0px",
            background: colors.grey, // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Pinned Locations
          </Typography>
        </Box>
        
        {pinnedLocations.length > 0 ? (
          pinnedLocations.map((location, i) => (
            <Box
              key={`${location.location}-${i}`}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                {location.location}
              </Typography>
              <Typography color={colors.grey[100]}>
                {location.disaster_type}
              </Typography>
              <Typography color={colors.grey[100]}>
                Severity: {location.severity.charAt(0).toUpperCase() + location.severity.slice(1)}
              </Typography>
              <Typography variant="body2">
                Date: {new Date(location.timestamp).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Report: {location.report}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color={colors.grey[100]} p="15px">No pinned locations found</Typography>
        )}
      </Box>
    </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            borderRadius: "15px",
            background: '#f0f0f6', // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
        >
          <Typography variant="h5" fontWeight="600">
            PieChart
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="135"/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {chartData[0].count} High Severity and {inventoryItems.length} items in inventory
            </Typography>
            <Typography></Typography>
          </Box>
          
        </Box>
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: "15px",
            background: '#f0f0f6', // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Disaster Stats
          </Typography>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          sx={{
            borderRadius: "15px",
            background: '#f0f0f6', // Light gray for neomorphism background
            boxShadow: `
              8px 8px 16px rgba(0, 0, 0, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.7)
            `, // Dual shadow for 3D effect
            border: "none", // Neomorphism often avoids solid borders
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
          {/* <Box height="200px" display="flex" justifyContent="center" alignItems="center">
  <img
    src="https://mausam.imd.gov.in/Radar/animation/Converted/PDP_MAXZ.gif"
    alt="Weather Radar"
    style={{ width: "80%", height: "auto" }}
  />
</Box> */}
        </Box>
      </Box>
    </Box>
    <Modal
  open={showPopup}
  onClose={handleClosePopup}
  aria-labelledby="popup-title"
  aria-describedby="popup-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: "10px",
    }}
  >
    {/* Red Blinking Curved Box for Severity */}
    <Box
      sx={{
        position: "absolute",
        top: "15px",
        right: "15px",
        px: 2,
        py: 0.5,
        fontSize:"13px",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        color: "#fff",
        fontWeight: "bold",
        boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.7)",
        animation: "blinker 1s linear infinite",
        "@keyframes blinker": {
          "50%": { opacity: 0.5 },
        },
      }}
    >
      Severity: High
    </Box>

    <Typography id="popup-title" variant="h5" component="h2">
      <strong>Latest OCR Data</strong>
    </Typography>
    <Box id="popup-description" mt={2}>
      {ocrData.length ? (
        <Typography>
          {ocrData[0]?.data || "No data available"}
        </Typography>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
    <Button
      onClick={handleClosePopup}
      sx={{ mt: 3, backgroundColor: colors.blueAccent[500], color: "#fff" }}
    >
      Close
    </Button>
  </Box>
</Modal>


    </Box>
  );
  
};



export default Dashboard1;
