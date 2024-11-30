import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./MyDonations.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const MyDonations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const userDonations = data?.orders.filter(
    (order) => order.donorEmail === currentUser.email
  );

  const columns = [
    { field: "donorName", headerName: "Donor Name", flex: 1 },
    { field: "donorEmail", headerName: "Donor Email", flex: 1 },
    { field: "donationItem", headerName: "Donated Item", flex: 1 },
    {
      field: "createdAt",
      headerName: "Donated At",
      flex: 1,
      valueGetter: (params) => new Date(params.row.createdAt).toLocaleString(),
    },
  ];

  const rows = data ? userDonations : [];

  return (
    <Box m="20px">
      <Header title="MY DONATIONS" subtitle="" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "16px"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontWeight: 800,
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

export default MyDonations;
