import React, { useContext, useState } from 'react'
import { Context } from '../context/ContextGlobal';
import { Musics } from '../mp3/Music/Music';

import ItemMusic from './../components/ItemMusic';
import BtnRadius from './../components/BtnRadius';

import { LuAlarmClock } from "react-icons/lu";
import { IoIosMore } from 'react-icons/io';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function SidebarRight() {
  const context = useContext(Context)
  const [active, setActive] = useState(1)
  const [activeSongListen, setActiveSongListen] = useState(false)
  const [data, setData] = useState([])
  const [path, setPath] = useState('mp3')
  const state2 = useSelector(state => state.openSidebarRightReducer)

  const handleActive= (num) => {
    if(num === 2) {
      setActiveSongListen(true)
    } else {
      setActiveSongListen(false)
    }
    setActive(num)
  }
  
  const fetching = useCallback( async () => {
    try {
       const url = `https://json-server-mp3.onrender.com/${path}`
       const callData = await fetch(url)
       if(!callData.ok) {
         throw new Error(`Fetching ${url} failed`)
       }
       const result = await callData.json()
       setData(result)
     } catch (err) {
       console.log(err)
     }
   },[path])
 
   useEffect(() => {
     fetching()
   },[fetching])

  return (
    <div className={`${state2.isOpen ? 'translate-x-[0]' : 'translate-x-[100%]'} fixed top-0 right-0 z-40 transition-all duration-500 w-[330px] h-[100%] pb-[90px] bg-transparent border-l-[#ffffff1a] border-l-2 `}>
      <section className='flex items-center justify-between text-gray-300 text-xs h-[65px] px-2'>
        <div className='flex rounded-full bg-[#2f2739] h-[32px] p-[3px]'>
          <button onClick={() => handleActive(1)} className={`${active === 1 ? 'bg-[#6d6875] text-white' : ''} min-w-[100px] rounded-full px-2`}>Danh sách phát</button>
          <button onClick={() => handleActive(2)} className={`${active === 2 ? 'bg-[#6d6875] text-white' : ''} min-w-[100px] rounded-full px-2`}>Nghe gần đây</button>
        </div>
        <BtnRadius props='bg-[#2f2739]'>
          <LuAlarmClock className='text-[16px] '/>
        </BtnRadius>
        <BtnRadius props='bg-[#2f2739]'>
          <IoIosMore className='text-[16px]' />
        </BtnRadius>
      </section>
      {
        activeSongListen 
      ?
        (<div className='overflow-y-auto'>
          {
            context.songListen?.map((item,index) => (
              <ItemMusic key={index} item={item} className='w-full rounded-[4px] hover:bg-searchRose py-[6px]' classWrap='flex justify-between' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'  />
            ))
          }
        </div>)
      :
        (<>
          <section>
            <div className='px-2'>
              <ItemMusic item={context.listPlay} className='w-full rounded-[4px] hover:bg-searchRose' classWrap='flex justify-between rounded-[4px] bg-[#9b4de0]' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'/>
            </div>
            <div className='text-white text-sm px-2 pt-[18px] pb-[15px]'>
              <h3>Tiếp theo</h3>
              <p className='text-[#feffff99]'>Từ playlist <b className='text-[#c273ed]'>Acoustic V-Pop</b></p>
            </div>
          </section>
          <section className='grid xl:grid-cols-1 h-[calc(100%_-_90px)] overflow-y-scroll px-2 '>
              {
                data.map((item, index) => (
                  <ItemMusic key={index} item={item} className='w-full rounded-[4px] hover:bg-searchRose py-[6px]' classWrap='flex justify-between' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'  />
                ))
              }
          </section>
        </>)
      }
    </div> 
  )
}

export default SidebarRight