import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { tokens } from "../../theme";
import newRequest from "../../utils/newRequest";
import Header from "../../components/Header";
import Donation from "../../components/donation/Donation";
import AddItem from "../../components/addItem/AddItem";
import useRoleCheck from "../../components/roleCheck/useRoleCheck";

const Inventory = () => {
  useRoleCheck();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading, error, data } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      try {
        const response = await newRequest.get("/inventory");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch inventory");
      }
    },
  });

  const handleUpdateCount = async (itemName) => {
    try {
      await newRequest.post(`/inventory/increase`, { itemName });
      window.location.reload();
      
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };

  const handleDecreaseCount = async (itemName) => {
    try {
      await newRequest.post(`/inventory/decrease`, { itemName });
      window.location.reload();
      
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };

  const columns = [
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: "count",
      headerName: "Count",
      type: "number",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => handleUpdateCount(params.row.itemName)}
            sx={{
              backgroundColor: 'green',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkgreen',
              },
              marginRight: 1,
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => handleDecreaseCount(params.row.itemName)}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
          >
            Remove
          </Button>
        </Box>
      ),
    },
    
  ];

  const rows = data ? data.inventoryItems : [];

  return (
    <Box m="20px">
      <Header title="INVENTORY" subtitle="List of Inventory Items" />
      <AddItem/>
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
          <p>Error: {error.message}</p>
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

export default Inventory;
