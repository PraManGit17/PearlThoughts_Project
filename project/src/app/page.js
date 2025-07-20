
"use client"


import React, { useRef } from 'react'
import CalenderPreview from '../components/CalenderPreview'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import { CalenderProvider } from '@/context/CalenderContext'
import EventForm from '@/components/EventForm'

const page = () => {

  const eventFormRef = useRef(null);

  return (
    <CalenderProvider>
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='w-full h-screen flex items-start justify-center gap-10 p-8'>
          <Details scrollToForm={() => eventFormRef.current?.scrollIntoView({ behavior: 'smooth' })}/>
          <CalenderPreview />
        </div>
        <div ref={eventFormRef}>
          <EventForm />
        </div>
      </div>
    </CalenderProvider>
  )
}

export default page
