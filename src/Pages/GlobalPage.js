import React, { useContext, useEffect } from 'react'
import GlobalLayout from '../layout/GlobalLayout'
import { Outlet } from 'react-router-dom'
import { Context } from '../context/ContextGlobal'
import { useDispatch, useSelector } from 'react-redux'
import { middleware } from '../redux/reducer'

function GlobalPage() {
  const context = useContext(Context)
  const dispatch = useDispatch()
  const thumb = useSelector((state) => state);

  useEffect(() => {
    dispatch(middleware.setThumbMiddleware(context.thumb))  
  },[context.thumb, dispatch])
  
  return (
    <div ref={context.elementContainer}>
        <GlobalLayout>
          <Outlet/>
        </GlobalLayout>
    </div>
  )
}

export default GlobalPage