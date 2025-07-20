
"use client"

import React, { use, useState } from 'react'
import { useCalender } from '@/context/CalenderContext'
import DatePicker from 'react-datepicker';

const EventForm = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState('Daily');
  const options = ['Yes', 'No'];
  const patterns = ['Standard', 'Customized'];
  const { selectedDate, endDate, setEndDate, addEvent } = useCalender();

  return (
    <div className='flex items-center w-full h-screen p-5'>

      <div className='w-[80%] h-full flex flex-col items-start gap-8 rounded-2xl px-8 py-5'>

        <div className='text-3xl font-semibold mb-4 leading-relaxed'>Scheduling An <span className='text-blue-600'>Event</span>:</div>
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
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            rows={6}
            cols={7}
            placeholder='Add Event Description'
            className='bg-gray-100 py-2 px-4 w-[60%] rounded-xl placeholder:text-md placeholder:font-normal placeholder:text-gray-400'
          />
        </div>

        <div className='flex items-center gap-10 w-full'>
          <div className='text-2xl font-medium'>Start Date:</div>
          {selectedDate ?
            (
              <div className='bg-gray-100 w-[19%] text-center outline-none py-2 px-4 rounded-md'>{selectedDate}</div>
            ) :
            (
              <div className='bg-gray-100 w-[19%] text-center outline-none py-2 px-4 rounded-md text-md font-normal text-gray-400'>Start-Date</div>
            )}
        </div>


        <div className='flex items-start gap-12 w-full'>
          <div className='text-2xl font-medium'>End Date:</div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={selectedDate}
            endDate={endDate}
            minDate={selectedDate}
            className='bg-gray-100 text-center outline-none py-2 px-4 rounded-md placeholder:text-md placeholder:font-normal placeholder:text-gray-400 placeholder:text-center'
            isClearable
            placeholderText="End-Date"

          />
        </div>


        {/* <div className='flex items-center w-full'>
          <div className='text-2xl font-medium max-w-48'>Want This Event To Reoccur:</div>
          {options.map((option) => (
            <label key={option} className="flex items-center gap-2 text-lg mr-4">
              <input
                type="radio"
                name="recurrence"
                value={option.toLowerCase()}
                className="accent-blue-500 w-5 h-5"
              />
              {option}
            </label>
          ))}
        </div> */}


        <div className='flex gap-2 w-full'>
          <div className='text-2xl font-medium max-w-2xl'>Recurrence Pattern:</div>
          <div className='w-full flex items-center gap-2'>
            <button className='bg-blue-600 text-md text-white font-medium rounded px-3 py-1
            cursor-pointer'
              onClick={() => {
                setRecurrence('Daily')
              }}>
              Daily</button>
            <button className='bg-blue-600 text-md text-white font-medium rounded px-3 py-1 cursor-pointer'
              onClick={() => {
                setRecurrence('Weekly')
              }}>Weekly</button>
            <button className='bg-blue-600 text-md text-white font-medium rounded px-3 py-1 cursor-pointer'
              onClick={() => {
                setRecurrence('Monthly')
              }}>Monthly</button>
            <button className='bg-blue-600 text-md text-white font-medium rounded px-3 py-1 cursor-pointer'
              onClick={() => {
                setRecurrence('Yearly')
              }}>Yearly</button>
          </div>
        </div>

        <div className='w-full flex items-center justify-start'>
          <button className='bg-blue-600 w-[30%] px-4 py-2 rounded-lg text-md text-white font-medium'
            onClick={() => {
              addEvent({
                title,
                description,
                startDate: selectedDate,
                endDate: endDate,
                recurrence
              })
            }}>
            Add Event
          </button>
        </div>
      </div>
    </div >
  )
}

export default EventForm
