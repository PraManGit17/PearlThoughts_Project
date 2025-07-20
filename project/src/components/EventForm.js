"use client"

import React, { useState } from 'react'
import { useCalender } from '@/context/CalenderContext'
import DatePicker from 'react-datepicker';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState('Daily');
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { selectedDate, endDate, setEndDate, dailyEvent } = useCalender();

  const formatDisplayDate = (date) => {
    if (!date) return 'Invalid Date';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className='flex items-center w-full h-screen p-5'>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white border border-blue-500 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4">
            <div className="text-xl font-semibold text-gray-800">Event Scheduled Successfully</div>
            <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className='w-[80%] h-full flex flex-col items-start gap-8 rounded-2xl px-8 py-5'>

        <div className='text-3xl font-semibold mb-4 leading-relaxed'>
          Scheduling An <span className='text-blue-600'>Event</span>:
        </div>


        <div className='flex items-center gap-10 w-full'>
          <div className='text-2xl font-medium'>Event Title:</div>
          <input
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add Event Title'
            className='bg-gray-100 py-2 px-4 w-[60%] rounded-xl placeholder:text-md placeholder:font-normal placeholder:text-gray-400'
          />
        </div>


        <div className='flex items-start gap-5 w-full'>
          <div className='text-2xl font-medium'>About Event:</div>
          <textarea
            name='About'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            cols={7}
            placeholder='Add Event Description'
            className='bg-gray-100 py-2 px-4 w-[60%] rounded-xl placeholder:text-md placeholder:font-normal placeholder:text-gray-400'
          />
        </div>


        <div className='flex items-center gap-10 w-full'>
          <div className='text-2xl font-medium'>Start Date:</div>
          <div className='bg-gray-100 w-[19%] text-center outline-none py-2 px-4 rounded-md'>
            {selectedDate ? formatDisplayDate(selectedDate) : 'Start-Date'}
          </div>
        </div>


        <div className='flex items-start gap-12 w-full'>
          <div className='text-2xl font-medium'>End Date:</div>
          <DatePicker
            selected={endDate instanceof Date ? endDate : (endDate ? new Date(endDate) : null)}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={selectedDate instanceof Date ? selectedDate : (selectedDate ? new Date(selectedDate) : null)}
            endDate={endDate instanceof Date ? endDate : (endDate ? new Date(endDate) : null)}
            minDate={selectedDate instanceof Date ? selectedDate : (selectedDate ? new Date(selectedDate) : null)}
            isClearable
            placeholderText="End-Date"
            className='bg-gray-100 text-center outline-none py-2 px-4 rounded-md placeholder:text-md placeholder:font-normal placeholder:text-gray-400 placeholder:text-center'
          />
        </div>

        <div className='flex gap-2 w-full'>
          <div className='text-2xl font-medium max-w-2xl'>Recurrence Pattern:</div>
          <div className='w-full flex items-center gap-2'>
            {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((type) => (
              <button
                key={type}
                className='bg-blue-600 text-md text-white font-medium rounded px-3 py-1 cursor-pointer'
                onClick={() => setRecurrence(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className='w-full flex items-center justify-start'>
          <button
            className='bg-blue-600 w-[30%] px-4 py-2 rounded-lg text-md text-white font-medium 
              hover:bg-blue-700 transition-all duration-200 cursor-pointer'
            onClick={async () => {
              setIsAdding(true);

              // await addEvent({
              //   title,
              //   description,
              //   startDate: selectedDate instanceof Date ? selectedDate.toISOString() : new Date(selectedDate).toISOString(),
              //   endDate: endDate instanceof Date ? endDate.toISOString() : new Date(endDate).toISOString(),
              //   recurrence,
              // });

              await dailyEvent({
                title,
                description,
                startDate: selectedDate instanceof Date ? selectedDate.toISOString() : new Date(selectedDate).toISOString(),
                endDate: endDate instanceof Date ? endDate.toISOString() : new Date(endDate).toISOString(),
              });


              setIsAdding(false);
              if (title && description && selectedDate && endDate) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);

              }
              else {
                alert('Fill all fields');
              }
            }}
          >
            {isAdding ? 'Adding Event...' : 'Add Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
