import React, { useContext, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import ControlAudio from './ControlAudio/ControlAudio'
import Particle from '../Component/Particle'
import SearchBar from '../Component/SearchBar'
import Modal from '../Component/Modal'
import Title from '../Component/Title'
import { ImgBackGround } from '../images/images'
import ItemImage from '../Component/ItemImage'
import { Context } from '../ContextGlobal/ContextGlobal'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function GlobalLayout({children}) {
  return (
    <>
      <div className='w-full relative z-50'>
        
        <SearchBar />
        <Sidebar />
          {children}
        <ControlAudio />
      </div>
    </>
  )
}

export default GlobalLayout