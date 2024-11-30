import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Paper, Divider } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import newRequest from '../../utils/newRequest';
import './NewsSlider.scss'; 

const NewsSlider = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newRequest.get('/news');
        console.log(response.data);
        setNews(response.data.news);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
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
    <Box mt={4} maxWidth="100%" mx="auto">
      <Typography variant="h3" align="center" gutterBottom>
        Latest News
      </Typography>
      <Slider {...settings} className='news-slider'>
        {news.map((item) => (
          <Box key={item._id} p={2}>
            <Paper elevation={6} style={{
              padding: '25px',
              width: '80%',
              margin:"auto",
              textAlign: 'center',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.3)', // Glassmorphism effect
              backdropFilter: 'blur(10px)', // Frosted glass effect
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              border: '1px solid rgba(255, 255, 255, 0.2)', // Optional border
            }}>
              <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {item.text}
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                {item.timestamp}
              </Typography>
              <Divider style={{ marginBottom: '10px' }} />
              <Typography variant="body2">
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none' }}>
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
