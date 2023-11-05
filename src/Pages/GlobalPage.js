import React, { useContext } from 'react'
import GlobalLayout from '../Layout/GlobalLayout'
import { Outlet } from 'react-router-dom'
import { Context } from '../ContextGlobal/ContextGlobal'

function GlobalPage() {
  const bgGlobalPage = useContext(Context)
  const thumbnail = 'bg-primary'
  return (
    <div 
      ref={bgGlobalPage.elementContainer} 
      className={`h-full ${bgGlobalPage.thumb ? '' : thumbnail}`} 
      style={{ 
        backgroundImage: `url('/mp3/${bgGlobalPage.thumb}')`, 
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: '',
        backgroundAttachment: 'fixed',
      }}>
        <GlobalLayout>
          <Outlet/>
        </GlobalLayout>
    </div>
  )
}

export default GlobalPage