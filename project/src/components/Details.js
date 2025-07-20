"use client"

import React from 'react'
import { useCalender } from '@/context/CalenderContext'

const Details = ({ scrollToForm }) => {
  const { selectedDate, events } = useCalender();

  const eventsOnDate = events.filter(event => {
    if (!event.occurrences || !selectedDate) return false;

    return event.occurrences.some(date => {
      const dateStr = typeof date === 'string' ? date : new Date(date).toISOString();
      return dateStr.slice(0, 10) === selectedDate;
    });
  });

  return (
    <div className='w-[40%] h-[80vh] flex flex-col gap-5 px-4'>
      <div className='bg-white rounded-full shadow-sm shadow-gray-700 px-4 py-2 text-xl font-bold'>
        Event Details
      </div>

      <div className='h-full w-full flex flex-col bg-white rounded-2xl shadow-sm shadow-gray-700 px-5 py-4'>

        <div className='flex flex-col text-xl font-medium'>
          Date
          <hr className='w-full border-gray-400 mt-2 mb-4' />
          <div className='flex items-center bg-white rounded-lg text-md font-medium'>
            {selectedDate || 'No date selected'}
          </div>
        </div>

        {selectedDate ? (
          <div className='flex flex-col text-xl font-medium mt-4 h-full'>
            Events
            <hr className='w-full border-gray-400 mt-2 mb-4' />

            <div className='h-full max-w-2xl flex flex-col items-start justify-start gap-2 text-sm font-normal'>
              {eventsOnDate.length > 0 ? (
                eventsOnDate.map((event, index) => (
                  <div key={index} className='flex items-center gap-1.5 bg-white p-2 rounded-lg shadow-sm shadow-gray-400'>
                    <div className='bg-blue-600 h-full w-1 rounded-2xl'></div>
                    <div className='w-full flex flex-col items-start justify-center'>
                      <div className="font-semibold text-xl">Event: <span className='font-medium'>{event.title}</span></div>
                      <div className="text-lg">{event.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex items-center gap-1.5 bg-white p-2 rounded-lg shadow-sm shadow-gray-400'>
                  <div className='bg-blue-600 h-full w-1 rounded-2xl'></div>
                  <div className='text-center'>
                    No Events Scheduled For Now On This Date
                  </div>
                </div>
              )}
              <button
                onClick={scrollToForm}
                className='py-1 px-2 text-white font-medium text-sm bg-blue-600 rounded-sm mt-2 hover:bg-white hover:border-blue-600 hover:border hover:text-blue-600 hover:cursor-pointer'
              >
                {eventsOnDate.length > 0 ? 'Schedule Another Event' : 'Schedule Event'}
              </button>

            </div>
          </div>
        ) : (
          <div className='h-full flex items-center justify-center text-sm font-medium leading-relaxed w-full mt-4'>
            Click On Any Date On The Calendar To View Events Scheduled On That Date
          </div>
        )}
      </div>
    </div>
  )
}

export default Details
