import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Grid, 
  Select, 
  MenuItem, 
  Button
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import Sidebar from '../../scenes/global/Sidebar';
import Header from '../../components/Header';
import NewsMap from './NewsMap';
import newRequest from '../../utils/newRequest';
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DisasterCard = styled(Card)(({ theme, severity }) => {
  const severityColors = {
    'low': theme.palette.success.light,
    'medium': theme.palette.warning.light,
    'high': theme.palette.error.light
  };

  return {
    borderRadius: '15px',
    width: '95%',
    height: 'auto', // Reduced height
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2), // Adjusted padding
    display: 'flex', // Align image and content side by side
    background: `linear-gradient(135deg, ${severityColors[severity?.toLowerCase()] || theme.palette.primary.main} 10%, rgba(255,255,255,0.9) 90%)`,
    boxShadow: `
      8px 8px 16px rgba(0, 0, 0, 0.15), 
      -8px -8px 16px rgba(255, 255, 255, 0.9)
    `,
    border: '1px solid rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: `0px 12px 25px rgba(0, 0, 0, 0.2)`
    }
  };
});

const Dashboard = () => {
  const [ocrData, setOcrData] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [disasterTypeFilter, setDisasterTypeFilter] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState('');
  const [severityFilter, setSeverityFilter] = React.useState('');
  const navigate = useNavigate();
  const [countryFilter, setCountryFilter] = React.useState("");
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [searchLocation, setSearchLocation] = React.useState('');
  const [pinnedLocation, setPinnedLocation] = React.useState(null);
  const [mapData, setMapData] = React.useState([]);
  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newRequest.get('/ocrdata'); 
        console.log('API response:', response.data); 
        setOcrData(response.data.ocrData || []); 
      } catch (error) {
        console.error('Error fetching OCR data:', error);
      }
    };

    fetchNews();
    const savedPinnedLocation = JSON.parse(localStorage.getItem('pinnedLocation'));
    if (savedPinnedLocation) {
      setPinnedLocation(savedPinnedLocation);
    }
  }, []);
  const handleGenerateReport = async () => {
    try {
      const data1 = {
        location: locationFilter || 'All', // Use the selected filter value
        startdate: startDate , // Fallback to current date
        enddate: endDate , // Fallback to current date
      };

      console.log(`h :${data1}`);
  
      const response = await axios.post('/totalreport', data1);
      alert('Special report created successfully!');
    } catch (error) {
      console.error('Error creating special report:', error);
      alert('Failed to create special report.');
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNavigate = () => {
    navigate("/tabledata"); // Navigate to /tabledata
  };
 

  const handlePinLocation = () => {
    const locationData = ocrData.find(data => data.location === searchLocation);
    if (locationData) {
      setPinnedLocation(locationData);
      localStorage.setItem('pinnedLocation', JSON.stringify(locationData));
    } else {
      alert('Location not found in data.');
    }
  };

  React.useEffect(() => {
    // Update map data with pinned location
    if (pinnedLocation) {
      setMapData([...ocrData, { ...pinnedLocation, isPinned: true }]);
    } else {
      setMapData(ocrData);
    }
  }, [pinnedLocation, ocrData]);

  const filteredData = ocrData
  .filter(data => !locationFilter || locationFilter === 'All' || data.location === locationFilter)
  .filter(data => !disasterTypeFilter || disasterTypeFilter === 'All' || data.disaster_type === disasterTypeFilter)
  .filter(data => !severityFilter || severityFilter === 'All' || data.severity.toLowerCase() === severityFilter)
  .filter(data => 
    !selectedDate || 
    new Date(data.timestamp).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
  )
  .filter(data => 
    !countryFilter || 
    (countryFilter === 'India' && data.in_india) || 
    (countryFilter === 'International' && !data.in_india)
  )
  .filter(data => {
    const dataDate = new Date(data.timestamp);
    return (!startDate || dataDate >= new Date(startDate)) &&
           (!endDate || dataDate <= new Date(endDate));
  });

  const renderDisasterData = () => {
    if (filteredData.length === 0) {
      return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="300px"
        >
          <Typography 
            variant="h6" 
            color="textSecondary"
          >
            No disaster data available
          </Typography>
        </Box>
      );
    }
    const locationClick = (newValue) => {
       setLocationFilter(newValue);
        
      }

    return (
      <Box>
        {filteredData.map((data) => (
          <Box key={data._id} width="100%" mb={4}>
            <DisasterCard severity={data.severity}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    color="primary"
                    maxWidth="900px"
                  >
                    {capitalizeFirstLetter(data.data)} 
                  </Typography>
                  {/* <Chip 
                    icon={<WarningAmberIcon />} 
                    label={`Severity: ${capitalizeFirstLetter(data.severity)}`} 
                    color={
                      data.severity?.toLowerCase() === 'high' ? 'error' : 
                      data.severity?.toLowerCase() === 'medium' ? 'warning' : 'success'
                    }
                    size="medium"
                  /> */}
                </Box>

                <Typography 
                  variant="h5" 
                  paragraph 
                  sx={{ color: 'text.secondary', mb: 2 }}
                >
                  {capitalizeFirstLetter(data.disaster_type)}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ color: 'text.secondary', mt: 2 }}
                >
                  Date: {new Date(data.timestamp).toLocaleDateString()}
                </Typography>

                

                <Typography 
                  variant="h5" 
                  fontWeight="bold"
                  sx={{ color: 'text.secondary', margin:"5px 0px" }}
                >
                  Source: {data.news_source}
                </Typography>
                {/* <Box 
                  display="flex" 
                  alignItems="center" 
                  
                >
                  <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="h6">
                    {data.location}
                  </Typography>
                </Box> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/summary`)} // Navigate to summary page
                  sx={{ position: 'relative', marginTop: "15px", left: 5 }}
                >
                  Read Summary
                </Button>
                <Box
  component="img"
  src={data.img || "https://media.istockphoto.com/id/1327617934/photo/aerial-view-of-flooded-houses-with-dirty-water-of-dnister-river-in-halych-town-western-ukraine.jpg?s=612x612&w=0&k=20&c=ffFK1c1lx15S3PlX-tee1py2wkLiKYLad67VvFwTG2I="}
  alt="Disaster Image"
  sx={{
    width: '260px',
    height: '200px',
    borderRadius: '8px',
    position: 'absolute',
    top: '20px',
    right: '20px'
  }}
/>
              </CardContent>
            </DisasterCard>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      <Box
        flexGrow={1}
        m="30px"
        sx={{
          marginRight: { xs: "10px", sm: "30px" }, // Responsive margin
        }}
      >
        {/* Header */}
        <Header
          title="AGGREGATED DATA"
          subtitle="Keep yourself updated with the latest news"
          titleSize="h4"
        />

        {/* News Map */}
        <Box display="flex">
        <Box flex={1} sx={{ minWidth: '60%', marginTop:"40px" }}>
        <NewsMap newsItems={{ socialMedia: [], newsFeed: [], otherSites: mapData }} />
      </Box>

      {/* Right Side Section */}
      <Box flex={1} p={3} sx={{ maxWidth: '40%', marginTop:"-50px" }}>
        <Card sx={{ padding: 2, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Search and Pin Location
            </Typography>
            <TextField
              fullWidth
              label="Enter Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handlePinLocation}>
              Pin Location
            </Button>
          </CardContent>
        </Card>

        {/* Pinned Location Card */}
        {pinnedLocation && (
  <Card 
    sx={{ 
      padding: 1, 
      borderRadius: 3, 
      background: 'linear-gradient(to bottom right, #f0f0f6, #eaf6fb)', 
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
      color: '#4a148c', 
      marginBottom: 1
    }}
  >
    <CardContent>
      <Typography 
        variant="h5" 
        mb={3} 
        fontWeight="bold" 
        sx={{ 
          textAlign: 'center', 
          textTransform: 'uppercase', 
          color: '#111' 
        }}
      >
        {pinnedLocation.data}
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.primary" 
        sx={{ 
          marginBottom: 1, 
          fontSize: '1.1rem', 
          fontWeight: 500 
        }}
      >
        📍 <strong>Location:</strong> {pinnedLocation.location}
      </Typography>

      <Typography 
        variant="body1" 
        color="text.primary" 
        sx={{ 
          marginBottom: 1, 
          fontSize: '1.1rem', 
          fontWeight: 500 
        }}
      >
        ⚠️ <strong>Disaster Type:</strong> {pinnedLocation.disaster_type}
      </Typography>

      <Typography 
        variant="body1" 
        color={pinnedLocation.severity.toLowerCase() === 'high' ? 'error.main' : pinnedLocation.severity.toLowerCase() === 'medium' ? 'warning.main' : 'success.main'} 
        sx={{ 
          marginBottom: 1, 
          fontSize: '1rem', 
          fontWeight: 500 
        }}
      >
        🔥 <strong>Severity:</strong> {pinnedLocation.severity}
      </Typography>

      <Typography 
        variant="body1" 
        color="text.primary" 
        sx={{ 
          marginBottom: 1, 
          fontSize: '1rem', 
          fontWeight: 500 
        }}
      >
        🗓️ <strong>Date:</strong> {new Date(pinnedLocation.timestamp).toLocaleDateString()}
      </Typography>

      <Typography 
        variant="body1" 
        color="text.primary" 
        sx={{ 
          marginBottom: 0, 
          fontSize: '1.1rem', 
          fontWeight: 500 
        }}
      >
        📰 <strong>Source:</strong> {pinnedLocation.news_source}
      </Typography>
    </CardContent>
  </Card>
)}

      </Box>
        </Box>

        {/* Latest News */}
        <Box mt={2}>
         
          <Box mt={2}>
  <Typography variant="h4" m={3} fontWeight="bold" textAlign="center">
    Latest News (Aggregated)
  </Typography>
  
  {/* Filter Section */}
  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3}>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {/* Top Row: 3 Filters */}
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" mb={1}>
          Location
        </Typography>
        <Autocomplete
          value={locationFilter}
          onChange={(event, newValue) => locationClick(newValue)} // Handles selection changes
          options={ocrData.map(location => location.location)} // Map through the data to get location names
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Location"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 200 }}
            />
          )}
          freeSolo // Allows typing values not in the list
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" mb={1}>
          Disaster Type
        </Typography>
        <Autocomplete
          value={disasterTypeFilter}
          onChange={(event, newValue) => setDisasterTypeFilter(newValue)} // Handles selection changes
          options={[...new Set(ocrData.map(data => data.disaster_type))]} // Remove duplicates using Set
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Disaster Type"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 200 }}
            />
          )}
          freeSolo // Allows typing values not in the list
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" mb={1}>
          Severity
        </Typography>
        <Select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ maxWidth: 200 }}
        >
          <MenuItem value="" disabled>Select Severity</MenuItem>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </Grid>
    </Grid>

    <Grid container spacing={2} justifyContent="center" mt={2}>
      {/* Bottom Row: 2 Filters */}
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" mb={1}>
          Country
        </Typography>
        <Select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ maxWidth: 200 }}
        >
          <MenuItem value="" disabled>Select Country</MenuItem>
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="International">International</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
  <Typography variant="h6" mb={1}>
    <strong>Start Date</strong>
  </Typography>
  <TextField
    type="date"
    value={startDate} // Use startDate state here
    onChange={(e) => setStartDate(e.target.value)} // Update startDate state
    fullWidth
    sx={{ maxWidth: 200 }}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>
<Grid item xs={12} sm={6} md={4}>
  <Typography variant="h6" mb={1}>
    <strong>End Date</strong>
  </Typography>
  <TextField
    type="date"
    value={endDate} // Use endDate state here
    onChange={(e) => setEndDate(e.target.value)} // Update endDate state
    fullWidth
    sx={{ maxWidth: 200 }}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>

    </Grid>
  </Box>
</Box>


<Box minWidth="300px" mt={2} sx={{ marginBottom: "20px" }}>
  <Button
    variant="contained"
    color="secondary"
    onClick={handleNavigate} // Existing navigation
  >
    <strong>View Table Data</strong>
  </Button>

  {/* <Button
    variant="contained"
    color="primary"
    sx={{ marginLeft: "10px" }}
    onClick={handleGenerateReport} // Call the POST request handler
  >
    <strong>Generate Special Report</strong>
  </Button> */}
</Box>

          {renderDisasterData()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
