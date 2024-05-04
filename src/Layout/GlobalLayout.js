import React from 'react'
import SearchBar from '../Component/SearchBar'
import SidebarLeft from './Sidebar/SidebarLeft'
import SidebarRight from './Sidebar/SidebarRight'
import ControlAudio from './ControlAudio/ControlAudio'

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