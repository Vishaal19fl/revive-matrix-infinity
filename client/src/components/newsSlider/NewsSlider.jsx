import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Paper, Divider, Chip } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import newRequest from '../../utils/newRequest';
import './NewsSlider.scss';

const NewsSlider = () => {
  const [ocrData, setOcrData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchOcrData = async () => {
      try {
        const response = await newRequest.get('/ocrdata');
        console.log('OCR Data Response:', response.data);
        // Check if the response contains an array
        setOcrData(Array.isArray(response.data.ocrData) ? response.data.ocrData : []);
      } catch (error) {
        console.error('Error fetching OCR data:', error);
      }
    };

    fetchOcrData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true, 
  };

  return (
    <Box mt={4} mx="auto" px={2}>
      <Typography variant="h3" align="center" gutterBottom>
        Disaster Updates
      </Typography>
      <Slider {...settings} className='news-slider'>
        {Array.isArray(ocrData) && ocrData.map((item, index) => (
          <Box key={index} p={2}>
            <Paper elevation={6} style={{
              padding: '25px',
              width: '80%',
              margin: "auto",
              textAlign: 'left',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <Typography variant="h5" component="h2" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {item.disaster_type || 'Disaster Type Unknown'}
              </Typography>
              <Chip 
                label={`Severity: ${item.severity || 'Unknown'}`} 
                color={item.severity === 'High' ? 'error' : item.severity === 'Moderate' ? 'warning' : 'success'}
                style={{ marginBottom: '10px' }}
              />
              <Divider style={{ marginBottom: '15px' }} />
              <Typography variant="body1" style={{ marginBottom: '10px' }}>
                <strong>Location:</strong> {item.location || 'Not Available'}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>
                <strong>News Source:</strong> {item.news_source || 'Unknown'}
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginBottom: '15px' }}>
                {item.data || 'No additional information provided.'}
              </Typography>
              <Typography variant="body2">
                <a href={item.news_source} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none' }}>
                  Read more
                </a>
              </Typography>
            </Paper>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default NewsSlider;
