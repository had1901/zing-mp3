import React, {  useEffect, useRef } from 'react'
import GlobalLayout from '../layout/GlobalLayout'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function GlobalPage() {
  const thumb = useSelector((state) => state.backgroundReducer.backgroundBody)
  const ref = useRef()

  useEffect(() => {
    let element = ref.current
    if(thumb) {
      element.style.backgroundImage = `url('/mp3/${thumb}')`
      element.classList.add('body-animate', 'thumb-background')
    }

    return () => {
      element.style.backgroundImage = ''
      element.style.backgroundColor = 'bg-primary'
      element.classList.remove('body-animate', 'thumb-background')
    }
  },[thumb])

  return (
    <div ref={ref}>
        <GlobalLayout>
          <Outlet/>
        </GlobalLayout>
    </div>
  )
}

export default GlobalPage