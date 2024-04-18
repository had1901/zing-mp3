import React, { useContext, useEffect, useState } from 'react'
import { BiDisc, BiBone } from "react-icons/bi";
import { AiOutlinePieChart, AiOutlineStar } from "react-icons/ai";
import { SiYoutubemusic } from "react-icons/si";
import { RiFolderMusicLine } from "react-icons/ri";
import { PiMusicNotesPlusDuotone } from "react-icons/pi";

import SidebarItem from '../../Component/Home/SidebarItem';
import Button from '../../Component/Button';
import { Context } from '../../ContextGlobal/ContextGlobal';
import { BsArrowLeft } from 'react-icons/bs';


const menuSidebar1 = [
  {
    link:'/',
    icon: BiDisc,
    title: 'Khám phá',
  },
  {
    link:'/zing-chart',
    icon: AiOutlinePieChart,
    title: '#zingchart',
  },
  {
    link:'/radio',
    icon: SiYoutubemusic,
    title: 'Radio',
  },
  {
    link:'/libraries',
    icon: RiFolderMusicLine,
    title: 'Thư viện',
  },
  
]
const menuSideBar2 = [
  {
    link:'/rank-music',
    icon: PiMusicNotesPlusDuotone,
    title: 'BXH Nhạc mới',
  },
  {
    link:'/topic',
    icon: BiBone,
    title: 'Chủ Đề & Thể Loại',
  },
  {
    link:'/top-rank',
    icon: AiOutlineStar,
    title: 'Top 100',
  },
]

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null)
  const [isActive, setIsActive] = useState(false)

  const bgSidebar = useContext(Context)

  const handleClick = (item) => {
        setActiveItem(item)
        setIsActive(!isActive)
      }
      
  useEffect(() => {
    if(activeItem) {
      switch(activeItem.title) {
        case menuSidebar1[0].title:
          document.title = 'Zing MP3 - Nghe nhạc mới, HOT nhất và tải nhạc miễn phí'
          break
        case menuSidebar1[1].title:
          document.title = '#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại'
          break
        case menuSidebar1[2].title:
          document.title = 'Radio | Xem bài hát, MV đang hot nhất hiện tại'
          break
        case menuSidebar1[3].title:
          document.title = 'Nhạc cá nhân | Xem bài hát, MV đang hot nhất hiện tại'
          break
        case menuSideBar2[0].title:
          document.title = '#zingchart tuần, #zingchart Zing - Bài hát'
          break
        case menuSideBar2[1].title:
          document.title = 'Chủ Đề Nhạc Hot | Tuyển tập nhạc hay chọn lọc'
          break
        case menuSideBar2[2].title:
          document.title = 'Top 100 | Tuyển tập nhạc hay chọn lọc'
          break
        default:
          return
      }
    }
  },[activeItem])


  return (
    <section ref={bgSidebar.sidebarRef} datatype='sidebar' className={`h-90 xl:translate-x-0 ${bgSidebar.isActiveSidebar === true ? 'sm:translate-x-0 xs:bg-smSidebarScreen shadow-sidebarShadow' : 'xs:-translate-x-full'}  transition-all fixed z-50 text-white ${bgSidebar.sideBar}`}>
      <BsArrowLeft className={`${bgSidebar.iconArrow} absolute right-5 top-6 text-xl`} onClick={() => bgSidebar.handleActiveSidebar() }/>
      <div className='w-60 flex flex-col h-full'>
        <div className='flex-1'>
          <div className='w-full h-70 px-7'>
            <div className='h-full py-3'>
              <img 
                src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg' 
                alt='logo' 
                className='w-120 h-10 block'
              />
            </div>
          </div>
          <div className='flex flex-col justify-between'>
            <div className=' flex flex-col justify-between'>
              <div>
                <ul>
                  {
                    menuSidebar1.map((item, index) => (
                      <SidebarItem refElement={bgSidebar.divRef} key={index} active={item === activeItem} className={`px-6 h-12 ${bgSidebar.thumb ? bgSidebar.colorText : bgSidebar.colorTextPrimary}`} item={item} onClick={() => handleClick(item)}/>
                    ))
                  }
                  <div className='overflow-y-auto mt-3 before:w-9/12 before:left-2/4 before:mx-auto before:h-px before:bg-zinc-600 before:top-0 before:block'>
                    <div className='pt-3'>
                      {
                        menuSideBar2.map((item, index) => (
                          <SidebarItem refElement={bgSidebar.divRef} key={index} active={item === activeItem} item={item} className={`px-6 h-12 ${bgSidebar.thumb ? bgSidebar.colorText : bgSidebar.colorTextPrimary}`} onClick={() => handleClick(item)}/>
                        ))
                      }
                    </div>
                  </div>
                </ul>
                <div className='bg-violet rounded-xl w-52 mx-auto p-3 mt-5 text-sm flex flex-col items-center font-semibold'>
                  <p className='text-center '>Đăng nhập để khám phá playlist dành riêng cho bạn</p>
                  <Button 
                    title='Đăng nhập' 
                    className='bg-transparent mt-2 border rounded-2xl w-36 text-center py-1 hover:text-colo hover:border-colo cursor-pointer'
                  />
                </div>
              </div>        
            </div>
          </div>
        </div>
      </div> 
    </section>
  )
}

export default Sidebar