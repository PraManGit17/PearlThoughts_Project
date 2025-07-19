
'use client';


import React, { createContext, useContext, useEffect, useState } from 'react'


const CalenderContext = createContext();

export const CalenderProvider = ({ children }) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('calendar-events'));
      if (Array.isArray(stored)) {
        setEvents(stored);
      } else {
        setEvents([]);
      }
    } catch (e) {
      console.error("Invalid localStorage value:", e);
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calender-events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
  };

  console.log("events:", events);
  console.log("selectedDate:", selectedDate);

  return (
    <CalenderContext.Provider
      value={
        { selectedDate, setSelectedDate, events, addEvent }
      } >
      {children}
    </CalenderContext.Provider>
  )
}

export const useCalender = () => useContext(CalenderContext); 