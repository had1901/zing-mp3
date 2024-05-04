import React, { useContext, useState } from 'react'
import SidebarItem from './Home/SidebarItem'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { PiMarkerCircle, PiPaintBrushBroadLight } from 'react-icons/pi'
import { GoShieldCheck } from 'react-icons/go'
import { FiPhone, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineChevronRight, HiOutlineDocumentText } from 'react-icons/hi'
import { BsArrowUpRight } from 'react-icons/bs'

import { Context } from '../ContextGlobal/ContextGlobal'
import Title from './Title'
import InputRange from './InputRange'
import Label from './Label'
import ToggleButton from './ToggleButton'
import Description from './Description'
import ToggleBtn from './ToggleBtn'



function TogglePopup({ classNameAdd, refElement, datatype }) {
  const [hover, setHover] = useState(null)
  const context = useContext(Context)

  let subMenu1 = <div className={`right-[94%] top-0 absolute hidden shadow-white  w-320 h-auto rounded-xl after:w-4 after:bg-transparent after:absolute after:-right-3 after:top-0 after:bottom-0 ${context.settingPopup} group-hover/btn:block`}>
                      <div className='px-3'>
                        <div className='flex items-center'>
                          <Title title='Chuyển bài' classNameMore={`${context.titlePopup} text-left text-md my-3`}/>
                          <Label title='PLUS' classNameChild='text-ss ml-2 ' />
                        </div>
                        <div className='flex item-center justify-between'>
                          <Title title='Chuyển bài mượt mà (CrossFada)' classNameMore='text-sm text-zinc-300 font-medium text-left my-3'/>
                          <ToggleBtn classNameParent='w-8 text-center flex flex-col justify-center' />
                        </div>
                        <div className='justify-between my-2'>
                          <InputRange />
                          <span className='mt-6 text-md text-zinc-300'>8 giay</span>
                        </div>
                        <div>
                          <div className='flex item-center justify-between'>
                            <Title title='Bỏ qua khoảng lặng (Gapless)' classNameMore='text-sm text-zinc-300 text-left my-1'/>
                            <ToggleBtn classNameParent='w-8 text-center flex flex-col justify-center'/>
                          </div>
                          <Description desc='Loại bỏ đoạn im lặng khi chuyển bài hát' classNameMore='text-xs text-zinc-400 text-left'/>
                        </div>
                        <Title title='Chất lượng nhạc' classNameMore='border-t-1 border-zinc-500 py-3 mt-6 text-left'/>
                        <div className='flex item-center justify-between text-zinc-400 py-2 text-sm'>
                          <Description desc='Thường (128 kbps)' />
                          <ToggleButton type='radio' name='radio'/>
                        </div>               
                        <div className='flex item-center justify-between text-zinc-400 py-2 text-sm'>
                          <Description desc='Cao (320 kbps)' />
                          <ToggleButton type='radio' name='radio'/>
                        </div>
                        <div className='flex item-center justify-between text-zinc-400 py-2 text-sm'>
                          <div className='flex item-center'>
                            <Description desc='Lossless' />
                            <Label title='PLUS' />
                          </div> 
                          <ToggleButton  type='radio' name='radio'/>
                        </div>
                        <div className='pb-1'>                      
                          <Title title='Phát nhạc' classNameMore='border-t-1 border-zinc-500 py-3 mt-6 text-left'/>
                          <div className='flex item-center justify-between'>
                            <Description desc='Luôn phát nhạc toàn màn hình' classNameMore='text-zinc-400 py-2 text-sm' />
                            <ToggleBtn classNameParent='w-8 text-center flex flex-col justify-center' />
                          </div>
                        </div>
                       
                      </div>
                </div>
  let subMenu2 = <div className={`right-[94%] top-[15%] absolute hidden shadow-white w-320 h-auto rounded-xl after:w-4 after:bg-transparent after:absolute after:-right-3 after:top-0 after:bottom-0 ${context.settingPopup} group-hover/btn:block`}>
                    <div className='p-4'>
                      <div className='cursor-pointer' onClick={context.handleChangeThumb}>
                        <div className='flex items-center justify-between hover:text-zinc-400'>
                          <Title title='Chủ đề' classNameMore='text-sm text-zinc-400'/>
                          <HiOutlineChevronRight className='right-1 top-1' />
                        </div>
                        <div className='flex items-center mt-3'>
                          <div className='w-1/3 rounded border border-searchRose'>
                            <img 
                              src={`${context.thumbSetting}`}  
                              alt='thumb' 
                              className='w-full block object-cover'        
                            />
                          </div>
                          <Description desc={context.thumbName} classNameMore='ml-3' />
                        </div>
                      </div>
                      <div className='mt-6 border-t-1 border-zinc-500 cursor-default'>
                        <div className='flex items-center justify-between mt-3'>
                          <Title title='Hiệu ứng chuyển động' classNameMore='text-sm text-zinc-400' />
                          <ToggleBtn classNameParent='w-8 text-center flex flex-col justify-center' />
                        </div>
                      </div>
                    </div>
                  </div>
  const menuTop = [
    {
      link:'/',
      icon: AiOutlinePlayCircle,
      title: 'Trình phát nhạc',
      subMenu: subMenu1,
    },
    {
      link:'/',
      icon: PiPaintBrushBroadLight,
      title: 'Giao diện',
      subMenu: subMenu2,
    },
  ]
  const menuBot = [
    {
      link:'/',
      icon: FiAlertCircle,
      title: 'Giới thiệu',
    },
    {
      link:'/',
      icon: FiPhone,
      title: 'Liên hệ',
    },
    {
      link:'/',
      icon: PiMarkerCircle,
      title: 'Quảng cáo',
    },
    {
      link:'/',
      icon: HiOutlineDocumentText,
      title: 'Thỏa thuận sử dụng',
    },
    {
      link:'/',
      icon: GoShieldCheck,
      title: 'Chính sách bảo mật',
    },
  ]

  const handleMouseEnter = (index) => {
    setHover(index)
  }

  return (
    <div ref={refElement} datatype={datatype} className={`w-240 z-10 hidden rounded-xl font-normal ${classNameAdd}`}>
      <div className='p-2 flex flex-col gap-y-2'>
        <div className='hi'>
          {
            menuTop.map((item, index) => (
              <SidebarItem 
                key={index} 
                item={item} 
                className={`${context.colorTextPopup} hover:bg-zinc-600 relative hover:bg-opacity-60 font-normal rounded-md h-11 px-3`}
                classNameMore='group/btn'
                element={<HiOutlineChevronRight className='right-1 top-1' />}
                onMouseEnter={() => handleMouseEnter(index)}
                elementAfter={item.subMenu}
              />   
            ))
          }
        </div>
        <div className='border-t-1 border-zinc-600 pt-2'>
          {
            menuBot.map((item, index) => (
              <SidebarItem 
                key={index} 
                item={item} 
                className='hover:bg-zinc-600 hover:bg-opacity-60 rounded-md font-normal text-zinc-500 h-11 px-3'
                element={<BsArrowUpRight className='right-1 top-1 group-hover/item:block text-zinc-600' />}
              />   
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TogglePopup