import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import newRequest from "../../utils/newRequest";
import Header from "../../components/Header";

const DisasterTable = () => {
    const [ocrData, setOcrData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts
      }, []);

    useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await newRequest.get("/ocrdata");
            console.log("API response:", response.data);
            const fetchedData = response.data.ocrData || [];
            setOcrData(fetchedData.reverse()); // Reverse the array
          } catch (error) {
            console.error("Error fetching OCR data:", error);
          }
        };
      
        fetchNews();
      }, []);
      

  const getImageByDisasterType = (type) => {
    if (type.includes("cyclone")) {
      return "https://zoom.earth/assets/images/storms/2048/2021/tauktae.5.jpg";
    } else if (type.includes("rain")) {
      return "https://t3.ftcdn.net/jpg/09/80/53/36/360_F_980533638_WbW7TrMtEhmosYWi9fdGOpRJu7jpcaAO.jpg";
    } else if (type.includes("flood")) {
      return "https://media.wired.com/photos/62acb81f83fe550206add714/master/pass/Satellites-Flooding-Science-GettyImages-1234014476.jpg";
    } else if (type.includes("earthquake")) {
        return "https://plus.unsplash.com/premium_photo-1695914233513-6f9ca230abdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWFydGhxdWFrZXxlbnwwfHwwfHx8MA%3D%3D";
      }
    
    return "https://zoom.earth/assets/images/storms/2048/2021/tauktae.5.jpg"; // Default image
  };

  const columns = [
    { field: "location", headerName: "Location", flex: 1 },
    { field: "disaster_type", headerName: "Disaster Type", flex: 1 },
    { field: "severity", headerName: "Severity", flex: 1 },
    { field: "timestamp", headerName: "Date", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 2,
      renderCell: (params) => (
        <img
          src={getImageByDisasterType(params.row.disaster_type)}
          alt={params.row.disaster_type}
          style={{ width: "50%", height: "100%", borderRadius: "5px", display:"flex", alignSelf:"center", margin:"auto" }}
        />
      ),
    },
  ];

  return (
    <Box m={2}>
      <Header title="Aggregated Data (Latest)" subtitle="List of Aggregated Data" />
      <Box
        sx={{
          height: 800,
          width: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "16px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontWeight: "500",
            whiteSpace: "normal",
            wordBreak: "break-word",
           
            lineHeight: "1.5",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#005c99",
            color: "#fff",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#005c99",
          },
        }}
      >
        <DataGrid
          rows={ocrData.map((disaster, index) => ({ ...disaster, id: index }))}
          columns={columns}
          pageSize={100}
          components={{ Toolbar: GridToolbar }}
          rowHeight={150} // Increased row height
          getRowSpacing={(params) => ({
            top: 8, // Gap above each row
            bottom: 8, // Gap below each row
          })}
        />
      </Box>
    </Box>
  );
};

export default DisasterTable;
