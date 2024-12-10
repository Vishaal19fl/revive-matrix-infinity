import React from 'react';
import { Box, Typography, Paper, Chip, Divider } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebar from '../../scenes/global/Sidebar';
import Header from '../../components/Header';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ViewReport = () => {
  const mockReports = [
    {
        id: 1,
        disaster_type: 'Flooding',
        severity: 'High',
        location: 'Cuttack, Odisha',
        coordinates: {lat:20.4625, lng:85.8828},
        data: 'Severe flooding reported near Mahanadi Barrage.',
        news_source: 'https://example.com/report/1',
      },
      {
        id: 2,
        disaster_type: 'Cyclone Damage',
        severity: 'Moderate',
        location: 'Puri, Odisha',
        coordinates: {lat:19.8135, lng:85.8312},
        data: 'Damaged houses and uprooted trees near Swargadwar Beach.',
        news_source: 'https://example.com/report/2',
      },
      {
        id: 3,
        disaster_type: 'Power Outage',
        severity: 'Low',
        location: 'Bhubaneswar, Odisha',
        coordinates: {lat:20.2961, lng:85.8245},
        data: 'Power outage reported in Saheed Nagar.',
        news_source: 'https://example.com/report/3',
      },
      {
        id: 4,
        disaster_type: 'Landslide',
        severity: 'High',
        location: 'Rayagada, Odisha',
        coordinates: {lat:19.1726, lng:83.4162},
        data: 'Landslide blocking NH-326 near Kalyansinghpur.',
        news_source: 'https://example.com/report/4',
      },
      {
        id: 5,
        disaster_type: 'Water Logging',
        severity: 'Moderate',
        location: 'Rourkela, Odisha',
        coordinates: {lat:22.2024, lng:84.8542},
        data: 'Water logging near Sector-5 Market due to heavy rains.',
        news_source: 'https://example.com/report/5',
      },
      {
        id: 6,
        disaster_type: 'Road Block',
        severity: 'High',
        location: 'Berhampur, Odisha',
        coordinates: {lat:19.3149, lng:84.7941},
        data: 'Fallen electric poles causing traffic disruption on NH-59.',
        news_source: 'https://example.com/report/6',
      },
  ];

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
          title="Civilian Reports"
          subtitle="Check the reports made by civilians"
          titleSize="h4"
        />

        
    <Box mt={4} mx="auto" px={2}>
      
      <Box my={4} style={{ height: '500px', borderRadius: '12px', overflow: 'hidden' }}>
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mockReports.map((report) => (
            <Marker key={report.id} position={[report.coordinates.lat, report.coordinates.lng]}>
              <Popup>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  {report.disaster_type}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                  <strong>Location:</strong> {report.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {report.data}
                </Typography>
                {/* <a
                  href={report.news_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#007BFF', textDecoration: 'none' }}
                >
                  Read more
                </a> */}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
      {mockReports.map((report) => (
        <Box key={report.id} p={2} mt={3}>
          <Paper
            elevation={6}
            style={{
              padding: '25px',
              width: '80%',
              margin: 'auto',
              textAlign: 'left',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              style={{ fontWeight: 'bold', marginBottom: '10px' }}
            >
              {report.disaster_type || 'Disaster Type Unknown'}
            </Typography>
            <Chip
              label={`Severity: ${report.severity || 'Unknown'}`}
              color={
                report.severity === 'High'
                  ? 'error'
                  : report.severity === 'Moderate'
                  ? 'warning'
                  : 'success'
              }
              style={{ marginBottom: '10px' }}
            />
            <Divider style={{ marginBottom: '15px' }} />
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              <strong>Location:</strong> {report.location || 'Not Available'}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '15px' }}>
              {report.data || 'No additional information provided.'}
            </Typography>
            {/* <Typography variant="body2">
              <a
                href={report.news_source}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007BFF', textDecoration: 'none' }}
              >
                Read more
              </a>
            </Typography> */}
          </Paper>
        </Box>
      ))}
    </Box>
    </Box>
    </Box>
  );
};

export default ViewReport;
