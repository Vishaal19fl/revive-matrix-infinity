import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { jsPDF } from "jspdf";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../../components/Header';

// Sample Disaster Progression Data
const SAMPLE_DISASTER_PROGRESSION = [
  {
    date: '2024-12-10',
    disasterType: 'Cyclone Fengal',
    location: 'Chennai, India',
    progression: [
      {
        time: 'Initial Report',
        details: 'Cyclone Fengal detected in Bay of Bengal, moderate wind speeds.'
      },
      {
        time: 'Morning',
        details: 'Wind speeds increasing. Preliminary evacuation orders issued.'
      }
    ],
    severity: 'Low',
    affectedArea: '50 sq km'
  },
  {
    date: '2024-12-11',
    disasterType: 'Cyclone Fengal',
    location: 'Chennai, India',
    progression: [
      {
        time: 'Early Morning',
        details: 'Heavy rainfall begins. Wind speeds reach 80-90 km/h.'
      },
      {
        time: 'Afternoon',
        details: 'Significant flooding reported in coastal areas. Infrastructure damage.'
      }
    ],
    severity: 'Medium',
    affectedArea: '150 sq km'
  },
  {
    date: '2024-12-12',
    disasterType: 'Cyclone Fengal',
    location: 'Chennai, India',
    progression: [
      {
        time: 'Morning',
        details: 'Peak cyclone conditions. Extensive flooding and wind damage.'
      },
      {
        time: 'Evening',
        details: 'Cyclone begins to weaken. Rescue and relief operations initiated.'
      }
    ],
    severity: 'High',
    affectedArea: '300 sq km'
  },
  {
    date: '2024-12-13',
    disasterType: 'Forest Fire',
    location: 'California, USA',
    progression: [
      {
        time: 'Morning',
        details: 'Fire detected in Sierra Nevada region, spreading quickly.'
      },
      {
        time: 'Afternoon',
        details: 'Firefighters mobilized. Evacuation orders issued for nearby communities.'
      }
    ],
    severity: 'Medium',
    affectedArea: '200 sq km'
  },
  {
    date: '2024-12-14',
    disasterType: 'Forest Fire',
    location: 'California, USA',
    progression: [
      {
        time: 'Morning',
        details: 'Fire continues to spread. Multiple firefighting teams engaged.'
      },
      {
        time: 'Evening',
        details: 'Partial containment achieved. Weather conditions improving.'
      }
    ],
    severity: 'High',
    affectedArea: '350 sq km'
  }
];

const DisasterProgressionReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProgression, setSelectedProgression] = useState([]);

  const handleDateRangeSelect = (selectInfo) => {
    const start = selectInfo.startStr;
    const end = selectInfo.endStr;

    setStartDate(start);
    setEndDate(end);

    // Filter progression data within the selected date range
    const filteredProgression = SAMPLE_DISASTER_PROGRESSION.filter(
      entry => entry.date >= start && entry.date <= end
    );

    setSelectedProgression(filteredProgression);
  };

  const generateProgressionPDF = () => {
    if (selectedProgression.length === 0) return;

    const doc = new jsPDF();
    
    // Government-style header
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text("OFFICIAL DISASTER PROGRESSION REPORT", 105, 15, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(20, 20, 190, 20);

    // Disaster Overview
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    
    // Group disasters by type
    const disasterTypes = [...new Set(selectedProgression.map(entry => entry.disasterType))];
    doc.text(`DISASTER(S): ${disasterTypes.join(', ')}`, 20, 30);
    
    doc.text(`LOCATION(S): ${[...new Set(selectedProgression.map(entry => entry.location))].join(', ')}`, 20, 40);
    doc.text(`DATE RANGE: ${startDate} to ${endDate}`, 20, 50);

    // Progression Details
    let yPosition = 70;
    selectedProgression.forEach((entry, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`DATE: ${entry.date}`, 20, yPosition);
      doc.text(`DISASTER: ${entry.disasterType}`, 20, yPosition + 10);
      doc.text(`SEVERITY: ${entry.severity}`, 20, yPosition + 20);
      doc.text(`AFFECTED AREA: ${entry.affectedArea}`, 20, yPosition + 30);

      doc.setFont('helvetica', 'normal');
      entry.progression.forEach((prog, progIndex) => {
        doc.text(`- ${prog.time}: ${prog.details}`, 20, yPosition + 50 + (progIndex * 10));
      });

      yPosition += 100; // Move down for next entry
    });

    // Footer with watermark
    doc.setTextColor(150);
    doc.setFont('helvetica', 'bold');
    doc.text("GENERATED BY REVIVE", 105, 280, { align: 'center', angle: 45 });

    doc.save(`DISASTER_PROGRESSION_${startDate}_TO_${endDate}.pdf`);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      p: 3,
      backgroundColor: '#F0F0F0'
    }}>
        <Header title="Generate Total Reports" subtitle="Select a Date" />
      <Card sx={{ 
        width: '100%', 
        maxWidth: 1000, 
        boxShadow: 3,
        border: '2px solid #4A4A4A'
      }}>
        <CardContent>
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              mb: 3, 
            
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: '#2C3E50'
            }}
          >
            Disaster Progression Report
          </Typography>

          {/* Calendar */}
          <Box sx={{ height: '600px', mb: 3 }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              select={handleDateRangeSelect}
              selectMode="range"
            />
          </Box>

          {/* Progression Display */}
          
        </CardContent>
      </Card>
      {selectedProgression.length > 0 && (
            <>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  mt:2,
                  fontWeight: 'bold',
                  color: '#2C3E50'
                }}
              >
                Disaster Progression: {[...new Set(selectedProgression.map(entry => entry.disasterType))].join(', ')}
              </Typography>

              {selectedProgression.map((entry, index) => (
                <Card key={index} sx={{ mb: 2, border: '1px solid #E0E0E0' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">
                          <strong>Date:</strong> {entry.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">
                          <strong>Disaster:</strong> {entry.disasterType}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">
                          <strong>Severity:</strong> {entry.severity}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle1">
                          <strong>Affected Area:</strong> {entry.affectedArea}
                        </Typography>
                      </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Progression Details</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {entry.progression.map((prog, progIndex) => (
                            <TableRow key={progIndex}>
                              <TableCell>{prog.time}</TableCell>
                              <TableCell>{prog.details}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 2 
              }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={generateProgressionPDF}
                  sx={{ 
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}
                >
                  Generate Progression PDF
                </Button>
              </Box>
            </>
          )}
    </Box>
  );
};

export default DisasterProgressionReport;