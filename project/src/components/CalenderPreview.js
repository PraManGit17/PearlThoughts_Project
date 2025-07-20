"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalender } from '@/context/CalenderContext'

const CalendarPreview = () => {

  const { setSelectedDate, events } = useCalender();

  const handleClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const calenderEvents = events.flatMap(event => 
    event.occurrences.map(date => ({
      title: event.title,
      start: date,
    }))
  );

  return (
    <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] p-4 sm:p-5 shadow-sm shadow-gray-700 rounded-2xl mx-auto'>
      <FullCalendar
        height={"75vh"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next",
          right: "title",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        dateClick={handleClick}
        events={calenderEvents}
      />
    </div>
  );
};

export default CalendarPreview;
