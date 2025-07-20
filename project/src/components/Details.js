"use client"

import React, { useEffect } from 'react'
import { useCalender } from '@/context/CalenderContext'

const Details = () => {


  const { selectedDate, events } = useCalender();

  const eventsonDate = selectedDate
    ? events.filter(e => e.date === selectedDate)
    : [];


  return (
    <div className='w-[40%] h-[70vh] flex flex-col gap-5 px-4 py-6'>
      <div className='bg-white rounded-full shadow-sm shadow-gray-700 px-8 py-2 text-xl font-bold'>Details: </div>

      <div className='h-full w-full flex flex-col gap-4 bg-white rounded-2xl shadow-sm shadow-gray-700 px-8 py-4'>

        <div className='flex items-center gap-4'>
          <div className='text-xl font-medium'>Date:</div> 
          <div className='text-lg font-normal'>{selectedDate || 'Select A Date'}</div>
        </div>
        <div className='flex flex-col text-xl font-medium mt-4 h-full'>
          Events
          <hr className='w-full border-gray-400 mt-2'></hr>
          <div className='h-full max-w-2xl flex flex-col items-center justify-center gap-2 text-sm font-normal'>

            {eventsonDate.length > 0 ? (
              eventsonDate.map((event, index) => {
                <div key={index} >
                  {event.title}
                </div>
              })
            ) : (
              <div className='text-center mb-3'>
                No Events Scheduled For Now On This Date
              </div>
            )}
            <button className='py-1 px-2 text-white font-medium text-sm bg-blue-600 rounded-sm'>Schedule Event</button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Details
