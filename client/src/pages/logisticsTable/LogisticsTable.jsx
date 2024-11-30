import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "../../theme";
import newRequest from "../../utils/newRequest";
import Header from "../../components/Header";

const LogisticsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["logistics"],
    queryFn: () => newRequest.get(`/logistics`).then((res) => res.data),
  });

  const [buttonStates, setButtonStates] = useState({});

  const handlePickup = async (id) => {
    try {
      await newRequest.patch(`/logistics/${id}/pickup`);
      setButtonStates((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], pickedUp: true },
      }));
      refetch(); // Refresh the data after the update
    } catch (error) {
      console.error("Error updating pickup status:", error);
    }
  };

  const handleDelivered = async (id) => {
    try {
      await newRequest.patch(`/logistics/${id}/deliver`);
      setButtonStates((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], delivered: true },
      }));
      refetch(); // Refresh the data after the update
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const columns = [
    { field: "logisticsName", headerName: "Logistics Name", flex: 1 },
    { field: "logisticsLocation", headerName: "Logistics Location", flex: 1 },
    { field: "pickupLocation", headerName: "Pickup Location", flex: 1 },
    { field: "deliveryLocation", headerName: "Delivery Location", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "itemQuantity", headerName: "Item Quantity", flex: 1 },
    {
      field: "pickup",
      headerName: "Pickup",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{
            backgroundColor: params.row.pickedUp ? "grey" : "green",
            color: "white",
          }}
          onClick={() => handlePickup(params.row._id)}
          disabled={params.row.pickedUp}
        >
          {params.row.pickedUp ? "Out for Delivery" : "Pickup"}
        </Button>
      ),
    },
    {
      field: "delivered",
      headerName: "Delivered",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{
            backgroundColor: params.row.delivered ? "white" : "orange",
            color: params.row.delivered ? "green" : "white",
          }}
          onClick={() => handleDelivered(params.row._id)}
          disabled={params.row.delivered}
        >
          {params.row.delivered ? "Delivered" : "Deliver"}
        </Button>
      ),
    },
  ];

  const rows = data ? data.map((logistic) => ({
    ...logistic,
    pickedUp: buttonStates[logistic._id]?.pickedUp || logistic.pickedUp,
    delivered: buttonStates[logistic._id]?.delivered || logistic.delivered,
  })) : [];

  return (
    <Box m="20px">
      <Header title="Logistics Table" subtitle="Status of Ongoing Deliveries" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "16px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading logistics</p>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default LogisticsTable;
