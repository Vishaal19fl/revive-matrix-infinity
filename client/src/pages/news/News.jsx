import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Grid, 
  Select, 
  MenuItem 
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import Sidebar from '../../scenes/global/Sidebar';
import Header from '../../components/Header';
import NewsMap from './NewsMap';
import newRequest from '../../utils/newRequest';

const DisasterCard = styled(Card)(({ theme, severity }) => {
  const severityColors = {
    'low': theme.palette.success.light,
    'medium': theme.palette.warning.light,
    'high': theme.palette.error.light
  };

  return {
    borderRadius: '10px',
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(3),
    background: theme.palette.background.default, // Use default background
    boxShadow: `
      -8px -8px 16px rgba(255, 255, 255, 0.6), 
      8px 8px 16px rgba(0, 0, 0, 0.1),
      inset -4px -4px 8px rgba(255, 255, 255, 0.5),
      inset 4px 4px 8px rgba(0, 0, 0, 0.05)
    `,
    border: 'none', // Remove border
    borderLeft: `2px solid ${severityColors[severity?.toLowerCase()] || theme.palette.primary.main}`,
    transition: 'all 0.3s ease-in-out',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '15px',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.05))',
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
      zIndex: 1,
      pointerEvents: 'none'
    },
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: `
        -10px -10px 20px rgba(255, 255, 255, 0.7), 
        10px 10px 20px rgba(0, 0, 0, 0.15),
        inset -6px -6px 10px rgba(255, 255, 255, 0.6),
        inset 6px 6px 10px rgba(0, 0, 0, 0.08)
      `,
      '&::before': {
        opacity: 1
      }
    },
    // Soft inner shadow for depth
    '& > *': {
      position: 'relative',
      zIndex: 2
    }
  };
});

const Dashboard = () => {
  const [ocrData, setOcrData] = React.useState([]);
  const [locationFilter, setLocationFilter] = React.useState('');
  const [severityFilter, setSeverityFilter] = React.useState('');

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
  }, []);

  const citiesInOdishaAndTamilNadu = [
    'All', 'Bhubaneswar', 'Cuttack', 'Puri', 'Kolkata', 'Chennai', 'Coimbatore', 'Madurai'
  ];

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const socialMediaData = [
    {
      id: 1,
      platform: "Twitter",
      content: "Huge flood alert in Chennai. Be prepared!",
      timestamp: "2024-08-22T12:00:00Z",
      coordinates: { lat: 13.0827, lng: 80.2707 },
    },
    {
      id: 2,
      platform: "Facebook",
      content: "Heavy rainfall expected tomorrow. Take necessary precautions.",
      timestamp: "2024-08-22T13:00:00Z",
      coordinates: { lat: 12.8352, lng: 79.7063 },
    },
  ];

  const newsFeedData = [
    {
      id: 1,
      headline: "Flood Warning Issued for Chennai",
      source: "Local News",
      timestamp: "2024-08-22T11:00:00Z",
      coordinates: { lat: 12.8333, lng: 80.1833 },
    },
    {
      id: 2,
      headline: "Government Prepares for Potential Flooding",
      source: "National News",
      timestamp: "2024-08-22T12:30:00Z",
    },
  ];

  const filteredData = ocrData
    .filter(data => !locationFilter || locationFilter === 'All' || data.location === locationFilter)
    .filter(data => !severityFilter || severityFilter === 'All' || data.severity.toLowerCase() === severityFilter);

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

    return (
      <Grid container spacing={3}>
        {filteredData.map((data) => (
          <Grid item xs={12} md={6} key={data._id}>
            <DisasterCard severity={data.severity}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    color="primary"
                  >
                    {capitalizeFirstLetter(data.disaster_type)}
                  </Typography>
                  <Chip 
                    icon={<WarningAmberIcon />} 
                    label={`Severity: ${capitalizeFirstLetter(data.severity)}`}
                    color={
                      data.severity?.toLowerCase() === 'high' ? 'error' : 
                      data.severity?.toLowerCase() === 'medium' ? 'warning' : 'success'
                    }
                    size="small"
                  />
                </Box>

                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ color: 'text.secondary', mb: 2 }}
                >
                  {capitalizeFirstLetter(data.data)}
                </Typography>

                <Box 
                  display="flex" 
                  alignItems="center" 
                  sx={{ color: 'text.secondary' }}
                >
                  <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">
                    {data.location}
                  </Typography>
                </Box>

                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{ 
                    position: 'absolute', 
                    bottom: 16, 
                    right: 20, 
                    color: 'text.disabled' 
                  }}
                >
                  Source: {data.news_source}
                </Typography>
              </CardContent>
            </DisasterCard>
          </Grid>
        ))}
      </Grid>
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

        {/* Filters */}
        <Box display="flex" justifyContent="center" gap="30px" mb={3}>
        
        <Box minWidth="300px">
            <Typography variant="h6" mb={1}>Location</Typography>
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              displayEmpty
              fullWidth
              sx={{ maxWidth: 200 }}
            >
              <MenuItem value="" disabled>Select Location</MenuItem>
              {citiesInOdishaAndTamilNadu.map((city, index) => (
                <MenuItem key={index} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box minWidth="300px">
            <Typography variant="h6" mb={1}>Severity</Typography>
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
          </Box>
        </Box>

        {/* News Map */}
        <NewsMap newsItems={{ socialMedia: socialMediaData, newsFeed: newsFeedData, otherSites: filteredData }} />

        {/* Latest News */}
        <Box mt={2}>
          <Typography variant="h4" m={3} fontWeight="bold" textAlign="center">
            Latest News (Aggregated)
          </Typography>
          
          {renderDisasterData()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
