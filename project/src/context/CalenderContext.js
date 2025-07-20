
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

  const dailyEvent = ({
    title,
    description,
    startDate,
    endDate,
    customInterval = 1,
  }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const interval = parseInt(customInterval) || 1;

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



  // const addEvent = ({
  //   title,
  //   description,
  //   startDate,
  //   endDate,
  //   recurrence
  // }) => {


  //   const start = new Date(startDate);
  //   const end = new Date(endDate);

  //   const diffTime = Math.abs(end - start);
  //   const diffDays = diffTime / (1000 * 60 * 60 * 24);

  //   let reocurr_events = false;

  //   let interval = 1;

  //   switch (recurrence) {
  //     case 'Daily':
  //       reocurr_events = diffDays >= 2;
  //       interval = 1;
  //       break;

  //     case 'Weekly':
  //       reocurr_events = diffDays >= 8
  //       interval = 7;
  //       break;


  //     case 'Monthly':
  //       reocurr_events = diffDays >= 31;
  //       interval = 30;
  //       break;

  //     case 'Yearly':
  //       reocurr_events = diffDays >= 366;
  //       interval = 365;
  //       break;
  //   }

  //   if (!reocurr_events) {
  //     alert(`Selected Dates are too close for ${recurrence} recurrence`);
  //   }

  //   const occurences = [];
  //   const currentDate = new Date(start);

  //   while (currentDate <= end) {
  //     occurences.push(new Date(currentDate));

  //     if (recurrence === 'Daily') {
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }
  //     else if (recurrence === 'Weekly') {
  //       currentDate.setDate(currentDate.getDate() + 7);
  //     }
  //     else if (recurrence === 'Monthly') {
  //       currentDate.setDate(currentDate.getMonth() + 1);
  //     }
  //     else if (recurrence === 'Yearly') {
  //       currentDate.setDate(currentDate.getFullYear() + 1);
  //     }
  //   }

  //   const newEvent = {
  //     title,
  //     description,
  //     startDate,
  //     endDate,
  //     recurrence,
  //     occurences,
  //     createdAt: new Date().toISOString(),
  //   };

  //   const createdEvent = [...events, newEvent];
  //   setEvents(createdEvent);


  // };



  return (
    <CalenderContext.Provider
      value={
        { selectedDate, setSelectedDate, events, dailyEvent, weeklyEvent, endDate, setEndDate }
      } >
      {children}
    </CalenderContext.Provider>
  )
}

export const useCalender = () => useContext(CalenderContext); 