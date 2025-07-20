import React from 'react'
import CalenderPreview from '../components/CalenderPreview'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import { CalenderProvider } from '@/context/CalenderContext'
import EventForm from '@/components/EventForm'

const page = () => {
  return (
    <CalenderProvider>
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='w-full h-screen flex items-start justify-center gap-10 p-8'>
          <Details />
          <CalenderPreview />
        </div>
        <EventForm />
      </div>
    </CalenderProvider>
  )
}

export default page
