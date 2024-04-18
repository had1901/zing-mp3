import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import ControlAudio from './ControlAudio/ControlAudio'
import SearchBar from '../Component/SearchBar'

function GlobalLayout({children}) {
  return (
      <div className='w-full relative z-50'>
          <SearchBar />
          <Sidebar />
            {children}
          <ControlAudio />
      </div>
  )
}

export default GlobalLayout