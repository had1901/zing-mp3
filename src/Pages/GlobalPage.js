import React, { useContext, useEffect } from 'react'
import GlobalLayout from '../Layout/GlobalLayout'
import { Outlet } from 'react-router-dom'
import { Context } from '../ContextGlobal/ContextGlobal'

function GlobalPage() {
  const context = useContext(Context)
  const thumbnail = 'bg-primary'

  useEffect(() => {
    document.body.style.backgroundColor = `${context.thumb ? '' : thumbnail}`
    document.body.style.backgroundImage = `url('/mp3/${context?.thumb}')`
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = ''
    document.body.style.backgroundAttachment = 'fixed'
  },[thumbnail,context])
  
  return (
    <div ref={context.elementContainer}>
        <GlobalLayout>
          <Outlet/>
        </GlobalLayout>
    </div>
  )
}

export default GlobalPage