import React from 'react'
import SearchBar from '../components/SearchBar'
import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import ControlAudio from './ControlAudio'

function GlobalLayout({children}) {
  return (
      <div className='w-full relative z-50'>
          <SearchBar />
          <SidebarLeft />
            {children}
          <SidebarRight />
          <ControlAudio />
      </div>
  )
}

export default GlobalLayout