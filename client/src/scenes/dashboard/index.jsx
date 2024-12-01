import React, { useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
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

const Dashboard1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
  
  const { data: ordersData, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  const orders = Array.isArray(ordersData?.orders) ? ordersData.orders : [];
  const donationCount = orders.length;
  const recentDonations = orders.slice(-6);

  return (
    <Box display="flex">
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
          onClick={() => navigate('/donationpage')}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb:"20px"
            }}
          >
            
            Make Donation
          </Button>
        </Box>
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
    overflow: "hidden",
    background: 'linear-gradient(40deg, rgba(255, 255, 255, 1) 0%,rgba(255, 241, 203, 0.8) 100%)',
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    // backgroundImage: "linear-gradient(to bottom right, #0071bf, #00ecff)",
  
  }}
>
          <StatBox
            title={isLoading ? "Loading..." : error ? "Error" : donationCount}
            subtitle="Number of Donations"
            progress="0.75"
            increase="+14%"
            
            icon={
              <VolunteerActivismIcon
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
    overflow: "hidden",
    background: 'linear-gradient(40deg, rgba(255, 255, 255, 1) 0%,rgba(255, 240, 203, 0.8) 100%)',
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  
  }}
>
          <StatBox
            title={isLoading1 ? "Loading..." : error1 ? "Error" : inventoryItems.length}
            subtitle="Items in Inventory"
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
    overflow: "hidden",
    background: 'linear-gradient(40deg, rgba(255, 255, 255, 1) 0%,rgba(255, 240, 203, 0.8) 100%)',
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  
  }}
>
          <StatBox
            title="22"
            subtitle="Pending Requests"
            progress="0.30"
            increase="+5%"
            icon={
              <PendingIcon
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
    overflow: "hidden",
    background: 'linear-gradient(40deg, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 203, 0.8) 100%)',
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  
  }}
>
          <StatBox
            title="14"
            subtitle="Number of Logistics"
            progress="0.80"
            increase="+43%"
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 8'}
  gridRow="span 2"
  sx={{
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(40deg, rgba(255, 250, 210, 0.1) 0%, rgba(255, 240, 203, 0.4) 100%)",
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
                Inventory
              </Typography>
              <Typography
                variant="h5"
               
                color={colors.greenAccent[500]}
              >
                Items Statistics
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
            <BarChart inventoryItems={inventoryItems} isDashboard={true} />
          </Box>
        </Box>
        <Box
  gridColumn={isMobile ? 'span 12' : 'span 4'}
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  overflow="auto"
>
  <Box
    display="flex"
    justifyContent="space-between"
    sx={{
      background: "linear-gradient(40deg, rgba(255, 250, 210, 0.1) 0%, rgba(255, 240, 203, 0.4) 100%)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    }}
    
    alignItems="center"
    borderBottom={`4px solid ${colors.primary[500]}`}
    colors={colors.grey[100]}
    p="15px"
  >
    <Typography  color={colors.grey[100]} variant="h5" fontWeight="600">
      Recent Donations
    </Typography>
  </Box>
  {isLoading ? (
    <Typography color={colors.grey[100]} p="15px">Loading...</Typography>
  ) : error ? (
    <Typography color={colors.grey[100]} p="15px">Error loading donations</Typography>
  ) : recentDonations.length > 0 ? (
    recentDonations.map((order, i) => (
      <Box
        key={`${order._id}-${i}`}
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        p="15px"
      >
        <Box mb={isMobile ? '10px' : '0'}>
          <Typography
            color={colors.greenAccent[500]}
            variant="h5"
            fontWeight="600"
          >
            {order.donorName}
          </Typography>
          <Typography color={colors.grey[100]}>
            {order.donorEmail}
          </Typography>
        </Box>
        <Box color={colors.grey[100]}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Box>
        <Box
          backgroundColor={colors.greenAccent[500]}
          p="5px 10px"
          borderRadius="4px"
          mt={isMobile ? '10px' : '0'}
        >
          {order.donationItem}
        </Box>
      </Box>
    ))
  ) : (
    <Typography color={colors.grey[100]} p="15px">No donations found</Typography>
  )}
</Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(40deg, rgba(255, 250, 250, 0.1) 0%, rgba(255, 240, 203, 0.4) 100%)",
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
            <ProgressCircle size="125"/>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {donationCount} donations and {inventoryItems.length} items in inventory
            </Typography>
            <Typography></Typography>
          </Box>
          
        </Box>
        <Box
          gridColumn={isMobile ? 'span 12' : 'span 4'}
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(40deg, rgba(255, 250, 210, 0.1) 0%, rgba(255, 240, 203, 0.4) 100%)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Inventory Items
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
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(40deg, rgba(255, 250, 210, 0.1) 0%, rgba(255, 240, 203, 0.4) 100%)",
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
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Dashboard1;
