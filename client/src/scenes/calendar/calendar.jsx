import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        location: selected.location // Ensure location is passed correctly
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}' at '${selected.event.location}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography>
                        Location: {event.extendedProps.location}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "Karthigai Deepam (Dec 13, 2024)",
                date: "2024-12-13",
                location: "Murugan Temples, Tamil Nadu",
                details: "Large crowds gather for rituals and processions, including pilgrimages.",
              },
              {
                id: "5123",
                title: "Magnetic Fields Festival (Dec 6–8, 2024)",
                date: "2024-12-06",
                location: "Alsisar, Rajasthan",
                details: "Attracts thousands for music performances, adventure sports, and parties.",
              },
              {
                id: "54321",
                title: "Perumthitta Tharavad (Dec 2024)",
                date: "2024-12-01",
                //d
                location: "Kasaragod, Kerala",
                details: "Large crowds gather for Theyyam dance performances, increasing risk of fire hazards.",
              },
              {
                id: "6789",
                title: "Indian Airforce Show (Oct 6, 2024)",
                date: "2024-10-6",
                location: "Chennai",
                details: "Sheer number of pilgrims increases the risk of accidents and stampedes.",
              },
              {
                id: "98765",
                title: "Kurukshetra Festival (Dec 11, 2024)",
                date: "2024-12-11",
                location: "Kurukshetra, Haryana",
                details: "Sheer number of pilgrims increases the risk of accidents and stampedes.",
              },
              
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
