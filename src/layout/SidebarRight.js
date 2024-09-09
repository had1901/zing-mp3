import React, { useContext, useState } from 'react'
import { Context } from '../context/ContextGlobal';

import ItemMusic from './../components/ItemMusic';
import BtnRadius from './../components/BtnRadius';

import { LuAlarmClock } from "react-icons/lu";
import { IoIosMore } from 'react-icons/io';
import { useSelector } from 'react-redux';
import ToggleBtn from '../components/ToggleBtn';

function SidebarRight() {
  const context = useContext(Context)
  const [active, setActive] = useState(1)
  const [activeSongListen, setActiveSongListen] = useState(false)
  const state2 = useSelector(state => state.openSidebarRightReducer)
  const songsSuggest = useSelector(state => state.getListSongReducer.listSong)
  const [toggleState, setToggleState] = useState(false)

  const handleToggleChange = (newState) => {
    setToggleState(newState)
  }

  const handleActive= (num) => {
    if(num === 2) {
      setActiveSongListen(true)
    } else {
      setActiveSongListen(false)
    }
    setActive(num)
  }


  return (
    <div className={`${state2.isOpen ? 'px-3 translate-x-[0]' : 'translate-x-[100%]'} fixed top-0 right-0 z-40 transition-all duration-500 w-[330px] h-[100%] pb-[90px] bg-transparent border-l-[#ffffff1a] border-l-2 `}>
      <section className='flex items-center justify-between text-gray-300 text-xs h-[65px] '>
        <div className='flex rounded-full bg-[#2f2739] h-[32px] p-[3px]'>
          <button onClick={() => handleActive(1)} className={`${active === 1 ? 'bg-[#6d6875] text-white' : ''} min-w-[100px] rounded-full px-2`}>Danh sách phát</button>
          <button onClick={() => handleActive(2)} className={`${active === 2 ? 'bg-[#6d6875] text-white' : ''} min-w-[100px] rounded-full px-2`}>Nghe gần đây</button>
        </div>
        <BtnRadius title='Hẹn giờ' placement='bottom' classMore='bg-[#2f2739]'>
          <LuAlarmClock className='text-[16px] '/>
        </BtnRadius>
        <BtnRadius title='Xem thêm' placement='bottom' classMore='bg-[#2f2739]'>
          <IoIosMore className='text-[16px]' />
        </BtnRadius>
      </section>
      {
        activeSongListen 
      ?
        (<div className='overflow-y-auto'>
          {
            context.songListen?.map((item,index) => (
              <ItemMusic key={index} song={item} className='w-full rounded-[4px] hover:bg-searchRose py-[6px]' classWrap='flex justify-between' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'  />
            ))
          }
        </div>)
      :
        (<>
          <section>  
            <ItemMusic song={context.listPlay} className='w-full rounded-[4px] hover:bg-searchRose' classWrap='flex justify-between rounded-[4px] bg-[#9b4de0]' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'/>
            <div className='flex items-center text-white text-sm pt-[18px] pb-[15px]'>
              <div className='flex-1'>
                <h3>{toggleState ? 'Tự động phát' : 'Đã tắt tự động phát'}</h3>
                <p className='text-[#feffff99]'>{toggleState ? 'Danh sách bài hát gợi ý' : 'Bật lên để phát tiếp các bài hát gợi ý'}</p>
              </div>
              <ToggleBtn onToggleChange={handleToggleChange} classNameParent='ml-4 mr-2'/>
            </div>
          </section>
          {
            toggleState &&
            <section className='h-[calc(100%_-_90px)] overflow-y-scroll '>
              {
                songsSuggest?.map((song, index) => (
                  <ItemMusic key={index} song={song} className='w-full rounded-[4px] hover:bg-searchRose py-[6px]' classWrap='flex justify-between' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'  />
                ))
              }
            </section>
          }
        </>)
      }
    </div> 
  )
}

export default SidebarRight