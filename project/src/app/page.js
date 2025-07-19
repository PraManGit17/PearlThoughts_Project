import React from 'react'
import CalenderPreview from '../components/CalenderPreview'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import { CalenderProvider } from '@/context/CalenderContext'

const page = () => {
  return (
    <CalenderProvider>
      <div className='flex flex-col w-full'>
        <Navbar />
        <div className='w-full flex items-center gap-10 p-8'>
          <Details />
          <CalenderPreview />
        </div>
      </div>
    </CalenderProvider>
  )
}

export default page
