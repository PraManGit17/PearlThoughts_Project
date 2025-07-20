
'use client';


import React, { createContext, useContext, useEffect, useState } from 'react'


const CalenderContext = createContext();

export const CalenderProvider = ({ children }) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  const deleteEvent = (eventToDelete, occurrenceToDelete) => {
    const updatedEvents = events
      .map((event) => {
        if (event.createdAt !== eventToDelete.createdAt) return event;

        const updatedOccurrences = event.occurrences.filter((date) => {
          const dateStr = new Date(date).toISOString().slice(0, 10);
          return dateStr !== occurrenceToDelete;
        });

        if (updatedOccurrences.length === 0) return null;

        return {
          ...event,
          occurrences: updatedOccurrences,
        };
      })
      .filter(Boolean); 

    setEvents(updatedEvents);
  };


  const oneTimeEvent = ({
    title,
    description,
    startDate,
  }) => {
    const eventDate = new Date(startDate);

    const newEvent = {
      title,
      description,
      startDate,
      recurrence: 'none',
      occurrences: [eventDate],
      createdAt: new Date().toISOString(),
    };

    const createdEvent = [...events, newEvent];
    setEvents(createdEvent);
  };


  const dailyEvent = ({
    title,
    description,
    startDate,
    endDate,
    customInterval,
  }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const interval = parseInt(customInterval);

    const diffTime = Math.abs(end - start);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < interval) {
      alert(`End date must be at least ${interval} days after start for this recurrence`);
      return;
    }

    const occurrences = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      occurrences.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + interval);
    }

    const newEvent = {
      title,
      description,
      startDate,
      endDate,
      recurrence: 'daily',
      interval,
      occurrences,
      createdAt: new Date().toISOString(),
    };

    const createdEvent = [...events, newEvent];
    setEvents(createdEvent);
  };

  const weeklyEvent = ({
    title,
    description,
    startDate,
    endDate,
    customInterval = 1,
    selectedWeekdays = [],
  }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const occurrences = [];

    const currentDate = new Date(start);
    const dayMap = {
      SU: 0,
      MO: 1,
      TU: 2,
      WE: 3,
      TH: 4,
      FR: 5,
      SA: 6,
    };

    while (currentDate <= end) {
      selectedWeekdays.forEach((dayCode) => {
        const weekdayOffset = (dayMap[dayCode] - currentDate.getDay() + 7) % 7;
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + weekdayOffset);

        if (nextDate <= end && nextDate >= start) {
          occurrences.push(new Date(nextDate));
        }
      });

      currentDate.setDate(currentDate.getDate() + customInterval * 7);
    }

    const newEvent = {
      title,
      description,
      startDate,
      endDate,
      recurrence: `weekly-every-${customInterval}-on-${selectedWeekdays.join(",")}`,
      occurrences,
      createdAt: new Date().toISOString(),
    };

    const createdEvent = [...events, newEvent];
    setEvents(createdEvent);
  };

  const monthlyEvent = ({
    title,
    description,
    startDate,
    endDate,
    customInterval = 1,
    dayOfMonth = null,
  }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const occurrences = [];

    const initialDay = dayOfMonth || start.getDate();
    let current = new Date(start);

    while (current <= end) {
      const year = current.getFullYear();
      const month = current.getMonth();

      const nextDate = new Date(year, month, initialDay);
      if (nextDate >= start && nextDate <= end) {
        occurrences.push(new Date(nextDate));
      }

      current.setMonth(current.getMonth() + customInterval);
    }

    const newEvent = {
      title,
      description,
      startDate,
      endDate,
      recurrence: `monthly-every-${customInterval}-on-${initialDay}`,
      occurrences,
      createdAt: new Date().toISOString(),
    };

    const createdEvent = [...events, newEvent];
    setEvents(createdEvent);
  };

  const yearlyEvent = ({
    title,
    description,
    startDate,
    endDate,
    customInterval = 1,
    dayOfMonth = null,
  }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const occurrences = [];

    const day = dayOfMonth || start.getDate();
    const month = start.getMonth();

    let currentYear = start.getFullYear();

    while (true) {
      const nextDate = new Date(currentYear, month, day);

      if (nextDate > end) break;

      if (nextDate >= start) {
        occurrences.push(nextDate);
      }

      currentYear += customInterval;
    }

    const newEvent = {
      title,
      description,
      startDate,
      endDate,
      recurrence: `yearly-every-${customInterval}-years`,
      occurrences,
      createdAt: new Date().toISOString(),
    };

    const createdEvent = [...events, newEvent];
    setEvents(createdEvent);
  };




  return (
    <CalenderContext.Provider
      value={
        { selectedDate, setSelectedDate, events, deleteEvent, oneTimeEvent, dailyEvent, weeklyEvent, monthlyEvent, yearlyEvent, endDate, setEndDate }
      } >
      {children}
    </CalenderContext.Provider>
  )
}

export const useCalender = () => useContext(CalenderContext); 