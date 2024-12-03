import React from "react";
import "./ReportForm.scss";

const ReportForm = () => {
  return (
    <div className="event-report-form">
      <h2>Report an Event</h2>
      <form>
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input type="text" id="eventName" placeholder="Enter event name" />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input type="date" id="eventDate" />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Description</label>
          <textarea
            id="eventDescription"
            rows="4"
            placeholder="Describe the event"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="eventLocation">Location</label>
          <input
            type="text"
            id="eventLocation"
            placeholder="Enter event location"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
