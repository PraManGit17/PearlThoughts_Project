
"use client"

import React, { useRef, useState } from 'react'
import CalenderPreview from '../components/CalenderPreview'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import { CalenderProvider } from '@/context/CalenderContext'
import EventForm from '@/components/EventForm'

const Page = () => {
  const eventFormRef = useRef(null);

  const [showForm, setShowForm] = useState(false);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      eventFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <CalenderProvider>
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='w-full min-h-screen flex flex-col lg:flex-row items-start justify-center gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 md:p-8'>
          <Details scrollToForm={scrollToForm} />
          <CalenderPreview />
        </div>

        {showForm && (
          <div ref={eventFormRef}>
            <EventForm />
          </div>
        )}
      </div>
    </CalenderProvider>
  )
}

export default Page
