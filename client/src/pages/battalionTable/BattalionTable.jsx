import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const BattalionTable = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "unit", headerName: "Unit", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "commandingOfficer", headerName: "Commanding Officer", flex: 1.5 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "telephone", headerName: "Telephone No.", flex: 1.5 },
    { field: "controlRoom", headerName: "Control Room No.", flex: 1 },
    { field: "fax", headerName: "Fax No.", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1.5 },
  ];

  const rows = [
    {
      id: 1,
      unit: "1st Battalion NDRF",
      address: "Patgaon PO - Azara, Guwahati",
      commandingOfficer: "Sh. Hitender Pal Singh Kandari",
      designation: "Commandant",
      telephone: "07637011337, 09435117246",
      controlRoom: "0361-2840027",
      fax: "0361-2840284",
      email: "assam01-ndrf[at]nic[dot]in",
    },
    {
      id: 2,
      unit: "2nd Battalion NDRF",
      address: "Near RRI Camp, Nadia, West Bengal",
      commandingOfficer: "Sh. Gurminder Singh",
      designation: "Commandant",
      telephone: "033-25875032, 09474061104",
      controlRoom: "033-25875032",
      fax: "033-25875032",
      email: "wb02-ndrf[at]nic[dot]in",
    },
    {
      id: 3,
      unit: "3rd Battalion NDRF",
      address: "PO-Mundali, Cuttack - Odisha Pin - 754013",
      commandingOfficer: "Sh. Vardhaman Mishra",
      designation: "Commandant",
      telephone: "0671-2879711, 09437581614",
      controlRoom: "0671-2879710",
      fax: "0671-2879711",
      email: "ori03-ndrf[at]nic[dot]in",
    },
    {
      id: 4,
      unit: "4th Battalion NDRF",
      address: "Suraksha Campus, Arrakonam, Distt. Ranipet, Tamilnadu-631152",
      commandingOfficer: "Sh. Akhilesh Kumar",
      designation: "Commandant",
      telephone: "04177-246169",
      controlRoom: "04177-246594, 09442140269",
      fax: "04177-246594",
      email: "tn04-ndrf[at]nic[dot]in",
    },
    {
      id: 5,
      unit: "5th Battalion NDRF",
      address: "Sudumbare, Mavel, Pune, Maharashtra-412109",
      commandingOfficer: "Sh. Santosh Bahadur Singh",
      designation: "Commandant",
      telephone: "09423506765, 09479001168",
      controlRoom: "09422315628, 09422318427",
      fax: "--",
      email: "mah05-ndrf[at]nic[dot]in",
    },
    {
      id: 6,
      unit: "6th Battalion NDRF",
      address: "Jarod Camp, Teh-Wagodia, Vadodara, Gujarat Pin - 391510",
      commandingOfficer: "Sh. Surender Singh",
      designation: "Commandant",
      telephone: "02668-299201, 09870006730",
      controlRoom: "09429199493",
      fax: "--",
      email: "guj06-ndrf[at]nic[dot]in",
    },
    {
      id: 7,
      unit: "7th Battalion NDRF",
      address: "Bibiwala Road, Bhatinda, Punjab Pin 151001",
      commandingOfficer: "Sh. Santosh Kumar",
      designation: "Commandant",
      telephone: "0164-2246193, 0164-2246570",
      controlRoom: "0164-2246030",
      fax: "0164-2246570",
      email: "pun07-ndrf[at]nic[dot]in",
    },
    {
      id: 8,
      unit: "8th Battalion NDRF",
      address: "Kamla Nehru Nagar, Ghaziabad (UP) Pin - 201002",
      commandingOfficer: "Sh. P.K.Tiwari",
      designation: "Commandant",
      telephone: "0120-2766618, 09412221035",
      controlRoom: "0120-2766013",
      fax: "0120 - 27666012",
      email: "up08-ndrf[at]nic[dot]in",
    },
    {
      id: 9,
      unit: "9th Battalion NDRF",
      address: "Bihata Patna, Bihar Pin - 801103",
      commandingOfficer: "Sh. Suneel Kumar Singh",
      designation: "Commandant",
      telephone: "06115-253939, 08544415050, 09525752125",
      controlRoom: "06115-253942",
      fax: "06115-253939",
      email: "patna-ndrf[at]nic[dot]in",
    },
    {
      id: 10,
      unit: "10th Battalion NDRF",
      address: "Village Kondapavuluru, PO- Surampalli, Gannavaram Mandal Krishna (AP) PIN - 521212",
      commandingOfficer: "Sh. V. V. N. Prasanna Kumar",
      designation: "Commandant",
      telephone: "08333068559, 08333068540, 08897900037",
      controlRoom: "--",
      fax: "--",
      email: "ap10-ndrf[at]nic[dot]in",
    },
    {
      id: 11,
      unit: "11th Battalion NDRF",
      address: "Sanskritik Sankul, Maqbool Alam Road, Varanasi, UP - 221002",
      commandingOfficer: "Sh. Manoj Kumar Sharma",
      designation: "Commandant",
      telephone: "0542-2501101, 08004931410",
      controlRoom: "0542-2501202",
      fax: "0542 - 2501101",
      email: "up-11ndrf[at]gov[dot]in",
    },
    {
        id: 12,
        unit: "12th Battalion NDRF",
        address: "BN NDRF, Itanagar, Arunachal Pradesh-791112",
        commandingOfficer: "Sh. Virendra Kumar Verma",
        designation: "Commandant",
        telephone: "0360-2999545, 09485235464",
        controlRoom: "0360-2999577",
        fax: "0360-2277106",
        email: "bn12[dot]ndrf[at]gov[dot]in",
      },
      {
        id: 13,
        unit: "13th Battalion NDRF",
        address: "BN NDRF, Ladhowal, Ludhiana, Punjab-141008",
        commandingOfficer: "Sh. Biju K. Sam",
        designation: "Commandant",
        telephone: "0161-2921305",
        controlRoom: "0161-2921304",
        fax: "--",
        email: "jk13[dot]ndrf[at]gov[dot]in",
      },
      {
        id: 14,
        unit: "14th Battalion NDRF",
        address: "BN NDRF, Nurpur, Jassur, Kangra, Himachal Pradesh PIN-176201",
        commandingOfficer: "Sh. Baljinder Singh",
        designation: "Commandant",
        telephone: "01893-292478",
        controlRoom: "01893-292602",
        fax: "--",
        email: "co14[dot]ndrf[at]gov[dot]in",
      },
      {
        id: 15,
        unit: "15th Battalion NDRF",
        address: "BN NDRF, PO-Gadarpur, Distt - Udhamsingh Nagar, Uttarakhand PIN-263152",
        commandingOfficer: "Sh. Sudesh Kumar Drall",
        designation: "Commandant",
        telephone: "05949-231198, 07579098442",
        controlRoom: "05949-231199",
        fax: "--",
        email: "co15[dot]ndrf[at]gov[dot]in",
      },
      {
        id: 16,
        unit: "16th Battalion NDRF",
        address: "BN NDRF, Near Dada Dev Mandir Road, Sector-7, Dwarka New Delhi, PIN-110077",
        commandingOfficer: "Sh. Abujam Bijoy Kumar Singh",
        designation: "Commandant",
        telephone: "011-20892672",
        controlRoom: "011-20893564",
        fax: "011-20892672",
        email: "co16[dot]ndrf[at]gov[dot]in",
      },
  ];
  
  

  return (
    <Box m="20px">
        <Header title="NDRF Units" subtitle="List of Battalions" />
    <Box
      m="40px 20px 0 20px"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          fontSize: "16px",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          fontWeight:"500",
          whiteSpace: "normal", // Enable wrapping
          wordBreak: "break-word", // Break words if necessary
          lineHeight: "1.5", // Adjust line height for better readability
        },
        "& .MuiDataGrid-column": {
          border: "1px solid #ddd", // Add border for each row
          
        
          overflow: "hidden", // Prevent content from overflowing
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#005c99",
          color: "#fff",
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: "#f78854",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "#005c99",
        },
        "& .MuiCheckbox-root": {
          color: `green !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        getRowHeight={() => "auto"} // Dynamically adjust row height
        getRowSpacing={(params) => ({
          top: 8, // Gap above each row
          bottom: 8, // Gap below each row
        })}
        disableColumnMenu // Optional: disable menu for cleaner UI
      />
    </Box>
    </Box>
  );
};

export default BattalionTable;
