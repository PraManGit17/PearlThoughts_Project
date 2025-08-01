

import React from 'react'
import { useCalender } from '@/context/CalenderContext'
import { Trash } from 'lucide-react';

const Details = ({ scrollToForm }) => {
  const { selectedDate, events, deleteEvent } = useCalender();

  const eventsOnDate = events.filter(event => {
    if (!event.occurrences || !selectedDate) return false;

    return event.occurrences.some(date => {
      const dateStr = typeof date === 'string' ? date : new Date(date).toISOString();
      return dateStr.slice(0, 10) === selectedDate;
    });
  });

  const handleDelete = (event, date) => {
    const confirmDelete = confirm("Are you sure you want to delete this event occurrence?");
    if (confirmDelete) {
      deleteEvent(event, date);
    }
  };

  return (
    <div className='w-full lg:w-[40%] h-auto lg:h-[80vh] flex flex-col gap-5 px-4'>
      <div className='bg-white rounded-full shadow-sm shadow-gray-700 px-4 py-2 text-lg sm:text-xl font-bold text-center'>
        Event Details
      </div>

      <div className='w-full flex flex-col bg-white rounded-2xl shadow-sm shadow-gray-700 px-5 py-4'>
        <div className='flex flex-col text-lg sm:text-xl font-medium'>
          Date
          <hr className='w-full border-gray-400 mt-2 mb-4' />
          <div className='flex items-center bg-white rounded-lg text-sm sm:text-md font-medium'>
            {selectedDate || 'No date selected'}
          </div>
        </div>

        {selectedDate ? (
          <div className='flex flex-col text-lg sm:text-xl font-medium mt-4'>
            Events
            <hr className='w-full border-gray-400 mt-2 mb-4' />

            {selectedDate < new Date().toISOString().slice(0, 10) ? (
              <div className='flex items-center gap-1.5 bg-white p-2 rounded-lg shadow-sm shadow-gray-400 w-full'>
                <div className='bg-red-600 h-full w-1 rounded-2xl'></div>
                <div className='text-sm sm:text-base text-center'>
                  No Event Could Be Scheduled On A Past Date
                </div>
              </div>
            ) : (
              <div className='w-full flex flex-col items-start justify-start gap-2 text-sm font-normal'>
                {eventsOnDate.length > 0 ? (
                  eventsOnDate.map((event, index) => (
                    <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-2 rounded-lg shadow-sm shadow-gray-400 w-full'>
                      <div className='bg-blue-600 h-1 sm:h-full w-full sm:w-1 rounded-2xl'></div>
                      <div className='flex flex-col items-start justify-center w-full'>
                        <div className="font-semibold text-base sm:text-xl">Event: <span className='font-medium'>{event.title}</span></div>
                        <div className="text-sm sm:text-lg">{event.description}</div>
                      </div>
                      <button
                        onClick={() => handleDelete(event, selectedDate)}
                        className="self-start sm:self-auto ml-auto bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 text-sm"
                      >
                        <Trash />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center gap-1.5 bg-white p-2 rounded-lg shadow-sm shadow-gray-400 w-full'>
                    <div className='bg-blue-600 h-full w-1 rounded-2xl'></div>
                    <div className='text-sm sm:text-base text-center'>
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
            )}
          </div>
        ) : (
          <div className='h-full flex items-center justify-center text-sm font-medium leading-relaxed w-full mt-4'>
            Click On Any Date On The Calendar To View Events Scheduled On That Date
          </div>
        )}

      </div>
    </div>
  );
};

export default Details;
