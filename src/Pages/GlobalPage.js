import React, { useContext, useEffect, useRef } from 'react'
import GlobalLayout from '../layout/GlobalLayout'
import { Outlet } from 'react-router-dom'
import { Context } from '../context/ContextGlobal'
import { useDispatch, useSelector } from 'react-redux'
import { middleware } from '../redux/reducer'

function GlobalPage() {
  const dispatch = useDispatch()
  const thumb = useSelector((state) => state.backgroundReducer.backgroundBody)
  console.log(thumb)
  const ref = useRef()

  // useEffect(() => {
  //   dispatch(middleware.setThumbMiddleware(context.thumb))  
  // },[context.thumb, dispatch])
  
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
    <div className='h-full' ref={ref}>
        <GlobalLayout>
          <Outlet/>
        </GlobalLayout>
    </div>
  )
}

export default GlobalPage