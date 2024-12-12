import React, { useEffect, useState } from 'react';
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
import newRequest from '../../utils/newRequest';

// Sample Disaster Progression Data
const SAMPLE_DISASTER_PROGRESSION = [
    {
      date: '2024-07-29',
      disasterType: 'Heavy Rainfall',
      location: 'Wayanad, India',
      progression: [
        {
          time: 'Evening',
          details: 'Continuous monsoon rains caused water levels to rise, triggering localized flooding. Low-lying areas reported waterlogging, and rivers swelled dangerously, cutting off remote villages. Authorities issued warnings for potential landslides as the region received over 150 mm of rain within 12 hours.'
        }
      ],
      severity: 'Medium',
      affectedArea: '50 sq km'
    },
    {
      date: '2024-07-30',
      disasterType: 'Landslide',
      location: 'Wayanad, India',
      progression: [
        {
          time: 'Early Morning',
          details: 'Landslides in Punjirimattom swept away homes and farmland. Chooralmala experienced flash floods, leaving over 200 families stranded and initial reports of 100 people missing.'
        },
        {
          time: 'Afternoon',
          details: 'Rescue teams faced challenges accessing the affected zones due to continuous rainfall and blocked roads.'
        }
      ],
      severity: 'High',
      affectedArea: '100 sq km'
    },
    {
      date: '2024-07-31',
      disasterType: 'Landslide',
      location: 'Wayanad, India',
      progression: [
        {
          time: 'Morning',
          details: 'Search and rescue teams recovered more bodies, raising the death toll to 150. Over 200 people remained missing as heavy rains hampered operations. Relief camps were established for survivors.'
        }
      ],
      severity: 'High',
      affectedArea: '150 sq km'
    },
    {
      date: '2024-08-01',
      disasterType: 'Landslide',
      location: 'Wayanad, India',
      progression: [
        {
          time: 'Afternoon',
          details: 'The death toll climbed to 220, with over 100 individuals still missing. Rescue efforts continued under challenging weather conditions, with food supplies air-dropped to remote areas.'
        }
      ],
      severity: 'High',
      affectedArea: '200 sq km'
    },
    {
      date: '2024-08-02',
      disasterType: 'Landslide',
      location: 'Wayanad, India',
      progression: [
        {
          time: 'Afternoon',
          details: 'Relief operations intensified as rains subsided. The death toll rose to 320 as more bodies were recovered. Reconstruction plans were announced, prioritizing shelter and food distribution for displaced families.'
        }
      ],
      severity: 'Medium',
      affectedArea: '150 sq km'
    }
  ];

const DisasterProgressionReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProgression, setSelectedProgression] = useState([]);
  const [ocrData, setOcrData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts
      }, []);

    useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await newRequest.get("/totalreport");
            console.log("API response:", response.data);
            const fetchedData = response.data.ocrData || [];
            setOcrData(fetchedData); // Reverse the array
          } catch (error) {
            console.error("Error fetching OCR data:", error);
          }
        };
      
        fetchNews();
      }, []);

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

    const report = "The Wayanad district in Kerala, India, was struck by a devastating series of events beginning on July 29, 2024.  Unrelenting monsoon rains, exceeding 150 mm in 12 hours, caused alarmingly high water levels and saturated the soil. By evening, localized flooding was reported in low-lying areas, and streams and rivers swelled dangerously, isolating some villages.  Authorities issued warnings for potential landslides. The heavy rainfall continued into July 30, triggering multiple catastrophic landslides. The first landslide hit Punjirimattom, destroying homes and farmland.  A subsequent, more devastating landslide struck Chooralmala, resulting in flash floods in surrounding areas. Over 200 families were stranded as roads became impassable, and early reports indicated over 100 people were missing. Rescue efforts were immediately hampered by persistent rain and blocked roads.  On July 31, a full-scale search and rescue operation commenced in Punjirimattom and Chooralmala. The death toll climbed to 150, with over 200 still missing.  The ongoing rain and blocked roads severely hindered rescue operations, leaving survivors stranded and without basic supplies. Relief camps were established, but accessibility remained a significant challenge.  As rescue operations continued into August 1, under difficult weather conditions, the death toll tragically rose to 220, with more than 100 people still unaccounted for.  The relentless rain continued to impede rescue efforts, necessitating the expansion of relief camps and the air-dropping of food supplies to isolated communities.  The scale of the disaster prompted officials to describe the event as one of the most severe natural disasters in Kerala's recent history. The combined impact of heavy rainfall and subsequent landslides caused widespread destruction, loss of life, and significant disruption to the region.  The disaster highlighted the vulnerability of hill districts to extreme weather events and the challenges of conducting rescue operations in such difficult conditions.  The long-term recovery process is anticipated to be substantial, requiring significant resources and coordinated efforts from various agencies and organizations.";
  
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
  
    let yPosition = 70;
    doc.setFont('helvetica', 'bold');
  const summaryTitle = "SUMMARY: ";
  const summaryTitleWidth = doc.getTextWidth(summaryTitle);
  doc.text(summaryTitle, 20, yPosition);
    const summaryLines = doc.splitTextToSize(report, 180); // Wrap long text to fit within the page width
  
    doc.setFont('helvetica', 'normal');
    
    doc.text(summaryLines, 20, yPosition+ 20);
  
    // Update yPosition based on the length of the summary
    yPosition += summaryLines.length * 10 + 20; // Adjust for each summary section
  
    // Add a new page if the content exceeds the available space
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
  
  
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