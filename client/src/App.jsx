import "./app.scss";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import GeminiChat from "./pages/chatbot/ChatBot";
import { ThemeProvider } from '@mui/material/styles';

import { useMode, ColorModeContext } from './theme';
import { Profile } from "./pages/profile/Profile";
import { Gig2 } from "./pages/gig2/Gig2";
import Certifications from "./pages/certifications/Certifications";
import Donation from "./components/donation/Donation";
import ViewInventory from "./pages/viewInventory/ViewInventory";
import MyDonations from "./pages/myDonations/MyDonations";
import Dashboard1 from "./scenes/dashboard";
import Geography from "./scenes/geography";
import Contacts from "./scenes/contacts";
import Pie from "./scenes/pie";
import Checkout from "./pages/checkout/Checkout";
import NotFound from "./pages/notFound/NotFound";
import Deliveries from "./pages/deliveries/Deliveries";
import LogisticsTable from "./pages/logisticsTable/LogisticsTable";
import { LogisticDetails } from "./pages/logisticDetails/LogisticDetails";
import Map from "./pages/map/Map";
import { ShelterDetails } from "./pages/shelterPage/Shelterpage";
import News from "./pages/news/News";
import Aggregate from "./pages/aggregate/Aggregate";
// import MapComponent from "./components/mapRoute/MapRoute";
function App() {
  const queryClient = new QueryClient();
  const [theme, colorMode] = useMode();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser?.isSeller);
  const DefaultRoute = () => {
    return currentUser?.isSeller ? <Dashboard1 /> : <Home />;
  };

  const Layout = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleChatButtonClick = () => {
    navigate('/chatbot');
  };
  if (currentUser?.isSeller) {
    return (
      <div className="app">
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <Outlet />
              <Footer />
            </QueryClientProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </div>
    );
  }

  return (
    <div className="app">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Outlet />
            <Footer />
            <Fab
              color="primary"
              aria-label="chat"
              style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
              }}
              onClick={handleChatButtonClick}
            >
              <ChatIcon />
            </Fab>
          </QueryClientProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};
  
  


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <DefaultRoute />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/donationPage",
          element: <Home />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/123",
          element: <Message />,
        },
        {
          path: "/dashboard",
          element: <Dashboard1 />,
        },
        {
          path: "/maps",
          element: <Geography />,
        },
        {
          path: "/piechart",
          element: <Pie />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/gig/123",
          element: <Gig2 />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        
        
       
        {
          path: "/chatbot",
          element: <GeminiChat />,
        },
        
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: '/donate',
          element: <Donation />,
        },
        {
          path: '/viewInventory',
          element: <ViewInventory />,
        },
        {
          path: '/myDonations',
          element: <MyDonations />,
        },
        {
          path: '/contacts',
          element: <Contacts />,
        },
        {
          path: '/checkout',
          element: <Checkout />,
        },
        {
          path: '/not-found',
          element: <NotFound />,
        },
        {
          path: '/deliveries',
          element: <Deliveries />,
        },
        {
          path: '/status',
          element: <LogisticsTable />,
        },
        {
          path: '/logisticdetails/123',
          element: <LogisticDetails />,
        },
        {
          path: '/pointmap',
          element: <Map />,
        },
        {
          path: '/shelterdetails/123',
          element: <ShelterDetails />,
        },
        {
          path: '/news',
          element: <News />,
        },
        {
          path: '/aggregated',
          element: <Aggregate />,
        },
        // {
        //   path: '/maproute',
        //   element: <MapComponent />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
