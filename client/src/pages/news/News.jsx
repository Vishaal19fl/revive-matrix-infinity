import React from 'react';
import { Box, Typography, Tabs, Tab, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import Sidebar from '../../scenes/global/Sidebar';
import Header from '../../components/Header';
import NewsSlider from '../../components/newsSlider/NewsSlider';
import newRequest from '../../utils/newRequest';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = React.useState('socialMedia');
  const [otherSitesData, setOtherSitesData] = React.useState([]);

  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newRequest.get('/news'); 
        console.log('API response:', response.data); 
        setOtherSitesData(response.data.news || []); 
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const socialMediaData = [
    { id: 1, platform: "Twitter", content: "Huge flood alert in Chennai. Be prepared!", timestamp: "2024-08-22T12:00:00Z" },
    { id: 2, platform: "Facebook", content: "Heavy rainfall expected tomorrow. Take necessary precautions.", timestamp: "2024-08-22T13:00:00Z" },
  ];

  const newsFeedData = [
    { id: 1, headline: "Flood Warning Issued for Chennai", source: "Local News", timestamp: "2024-08-22T11:00:00Z" },
    { id: 2, headline: "Government Prepares for Potential Flooding", source: "National News", timestamp: "2024-08-22T12:30:00Z" },
  ];

  return (
    <Box display="flex">
      {/* SIDEBAR */}
      <Sidebar />

      <Box flexGrow={1} m="30px">
        <Header title="AGGREGATED DATA" subtitle="Keep yourself updated with the latest news" titleSize="h4" />
        
        <Paper>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontSize: '1rem',
                fontWeight: 'bold',
              },
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <Tab value="socialMedia" label="Social Media Data" />
            <Tab value="newsFeed" label="News Feed Data" />
             <Tab value="otherSites" label="Other Sites" /> 
          </Tabs>
        </Paper>
        
        {currentTab === 'socialMedia' && (
          <Box mt={2}>
            <Typography variant="h4" fontWeight="bold">Social Media Data</Typography>
            <List>
              {socialMediaData.map(data => (
                <Box key={data.id} p={2} mb={2} borderRadius="8px" border={1} borderColor="divider" bgcolor="background.paper">
                  <ListItem>
                    <ListItemText
                      primary={`${data.platform}: ${data.content}`}
                      secondary={`Timestamp: ${new Date(data.timestamp).toLocaleString()}`}
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1rem' } }} 
                      secondaryTypographyProps={{ variant: 'body2', sx: { fontSize: '0.875rem' } }} 
                    />
                  </ListItem>
          
                </Box>
              ))}
            </List>
          </Box>
        )}
        
        {currentTab === 'newsFeed' && (
          <Box mt={2}>
            <Typography variant="h4" fontWeight="bold">News Feed Data</Typography>
            <List>
              {newsFeedData.map(data => (
                <Box key={data.id} p={2} mb={2} borderRadius="8px" border={1} borderColor="divider" bgcolor="background.paper">
                  <ListItem>
                    <ListItemText
                      primary={data.headline}
                      secondary={`Source: ${data.source} | Timestamp: ${new Date(data.timestamp).toLocaleString()}`}
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1rem' } }}
                      secondaryTypographyProps={{ variant: 'body2', sx: { fontSize: '0.875rem' } }} 
                    />
                    {data.link && (
                      <Box mt={1}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.875rem', color: 'primary.main', textDecoration: 'underline' }}
                          component="a"
                          href={data.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read more
                        </Typography>
                      </Box>
                    )}
                  </ListItem>
                 
                </Box>
              ))}
            </List>
          </Box>
        )}

{currentTab === 'otherSites' && (
          <Box mt={2}>
            <Typography variant="h4" fontWeight="bold">Other Sites</Typography>
            <List>
              {otherSitesData.length > 0 ? (
                otherSitesData.map(data => (
                  <Box key={data.id} p={2} mb={2} borderRadius="8px" border={1} borderColor="divider" bgcolor="background.paper">
                    <ListItem>
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                              {data.text}
                            </Typography>
                            {data.link && (
                              <Typography
                                variant="body2"
                                sx={{ fontSize: '0.875rem', color: 'primary.main', textDecoration: 'underline' }}
                                component="a"
                                href={data.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {data.link}
                              </Typography>
                            )}
                          </>
                        }
                        secondary={`Timestamp: ${data.timestamp}`}
                        primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1rem' } }}
                        secondaryTypographyProps={{ variant: 'body2', sx: { fontSize: '0.875rem' } }}
                      />
                    </ListItem>
                  
                  </Box>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No data available" />
                </ListItem>
              )}
            </List>
          </Box>
        )}
         
      </Box>
     
    </Box>
    
    
  );
};

export default Dashboard;
