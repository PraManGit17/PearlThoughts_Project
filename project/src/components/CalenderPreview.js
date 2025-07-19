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
    <div className='h-full w-[50%] p-5 border-2 rounded-2xl shadow-lg shadow-gray-200 '>
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
