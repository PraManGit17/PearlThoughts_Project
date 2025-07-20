"use client"

import React, { useState } from 'react'
import { useCalender } from '@/context/CalenderContext'
import DatePicker from 'react-datepicker';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [customInterval, setCustomInterval] = useState(1);
  const [showDailyCustomization, setShowDailyCustomization] = useState(false);
  const [weeklyInterval, setWeeklyInterval] = useState(1);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [monthlyInterval, setMonthlyInterval] = useState(1);
  const [monthlyDay, setMonthlyDay] = useState(null);


  const { selectedDate, endDate, setEndDate, dailyEvent, weeklyEvent, monthlyEvent, yearlyEvent } = useCalender();

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

        <div className='flex flex-col items-start justify-start gap-2 w-full'>
          <div className='flex items-center space-x-8'>
            <div className='text-2xl font-medium max-w-2xl'>Recurrence Pattern:</div>
            <div className='flex items-center gap-2'>
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1 text-md font-medium rounded ${recurrence === type ? 'bg-white text-blue-600 border border-blue-600' : 'bg-blue-600 text-white'} 
                       transition duration-200`}
                  onClick={() => {
                    setRecurrence(type);
                    if (type !== 'Daily') setShowDailyCustomization(false);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Customized Daily */}

          {recurrence === 'Daily' && (
            <div className='flex items-center relative px-60'>
              <div className="flex items-center gap-3 bg-white shadow-sm shadow-gray-800 px-3 py-2 rounded-lg">
                <span className="text-md text-gray-800">Repeat every</span>
                <input
                  type="number"
                  value={customInterval}
                  min={1}
                  onChange={(e) => setCustomInterval(e.target.value)}
                  className="w-16 px-2 py-1 border rounded-md text-center"
                />
                <span className="text-md text-gray-800">day(s)</span>
                <button
                  onClick={() => setShowDailyCustomization(false)}
                  className="text-red-500 ml-2 font-black hover:text-red-700"

                >
                  ✕
                </button>
              </div>

            </div>
          )}

          {/* Customized Weekly */}
          {recurrence === 'Weekly' && (
            <div className='mt-2 px-60 '>
              <div className='flex flex-col gap-4 px-3 py-2 shadow-sm shadow-gray-800 rounded-lg'>
                <div className="flex items-center gap-3 ">
                  <span className="text-md text-gray-800">Repeat every</span>
                  <input
                    type="number"
                    min={1}
                    value={weeklyInterval}
                    onChange={(e) => setWeeklyInterval(Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded-md text-center"
                  />
                  <span className="text-md text-gray-800">week(s)</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                    <label key={day} className="flex items-center gap-1 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        value={day}
                        checked={selectedWeekdays.includes(day)}
                        onChange={() => {
                          setSelectedWeekdays((prev) =>
                            prev.includes(day)
                              ? prev.filter((d) => d !== day)
                              : [...prev, day]
                          );
                        }}
                        className="accent-blue-600"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {recurrence === 'Monthly' && (
            <div className="flex flex-col gap-4 mt-4">

              <div className="flex items-center gap-3">
                <span className="text-md text-gray-800">Repeat every</span>
                <input
                  type="number"
                  min={1}
                  value={monthlyInterval}
                  onChange={(e) => setMonthlyInterval(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded-md text-center"
                />
                <span className="text-md text-gray-800">month(s)</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-md text-gray-800">On the</span>
                <input
                  type="number"
                  min={1}
                  max={31}
                  placeholder={selectedDate ? new Date(selectedDate).getDate() : '15'}
                  value={monthlyDay || ''}
                  onChange={(e) => setMonthlyDay(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded-md text-center"
                />
                <span className="text-md text-gray-800">day of the month</span>
              </div>

            </div>
          )}

        </div>


        <div className='w-full flex items-center justify-start'>
          <button
            className='bg-blue-600 w-[30%] px-4 py-2 rounded-lg text-md text-white font-medium 
              hover:bg-blue-700 transition-all duration-200 cursor-pointer'
            onClick={async () => {
              setIsAdding(true);

              if (recurrence === 'Daily') {
                await dailyEvent({
                  title,
                  description,
                  startDate: selectedDate instanceof Date ? selectedDate.toISOString() : new Date(selectedDate).toISOString(),
                  endDate: endDate instanceof Date ? endDate.toISOString() : new Date(endDate).toISOString(),
                  customInterval: showDailyCustomization ? customInterval : 1,
                });

              }

              if (recurrence === 'Weekly') {
                await weeklyEvent({
                  title,
                  description,
                  startDate: selectedDate instanceof Date ? selectedDate.toISOString() : new Date(selectedDate).toISOString(),
                  endDate: endDate instanceof Date ? endDate.toISOString() : new Date(endDate).toISOString(),
                  customInterval: weeklyInterval,
                  selectedWeekdays: selectedWeekdays.length > 0 ? selectedWeekdays : ['MO'], // fallback
                });
              }

              if (recurrence === 'Monthly') {
                await monthlyEvent({
                  title,
                  description,
                  startDate: selectedDate instanceof Date ? selectedDate.toISOString() : new Date(selectedDate).toISOString(),
                  endDate: endDate instanceof Date ? endDate.toISOString() : new Date(endDate).toISOString(),
                  customInterval: monthlyInterval,
                  dayOfMonth: monthlyDay, // If null, defaults to startDate.getDate()
                });
              }


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
