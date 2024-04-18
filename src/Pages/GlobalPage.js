import React, { useContext, useEffect } from 'react'
import GlobalLayout from '../Layout/GlobalLayout'
import { Outlet } from 'react-router-dom'
import { Context } from '../ContextGlobal/ContextGlobal'

function GlobalPage() {
  const bgGlobalPage = useContext(Context)
  const thumbnail = 'bg-primary'

  useEffect(() => {
    document.body.style.backgroundColor = `${bgGlobalPage.thumb ? '' : thumbnail}`
    document.body.style.backgroundImage = `url('/mp3/${bgGlobalPage?.thumb}')`
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = ''
    document.body.style.backgroundAttachment = 'fixed'
  },[thumbnail,bgGlobalPage])
  
  return (
    <div ref={bgGlobalPage.elementContainer}>
        <GlobalLayout>
          <Outlet/>
        </GlobalLayout>
    </div>
  )
}

export default GlobalPage