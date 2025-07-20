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

  return (
    <div className='w-[50%] p-5 shadow-sm shadow-gray-700 rounded-2xl'>
      <FullCalendar
        height={"70vh"}
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
      />
    </div>
  );
};

export default CalendarPreview;
