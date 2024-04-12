import React, { useEffect, useRef, useContext, useState } from 'react'
import '../../../src/index.css';

import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Images, ImgBackGround } from '../../images/images';
import { Chills, Musics, MusicsVN, MusicsWorld } from '../../mp3/Music/Music';

import Content from '../../Component/Content';
import ItemMusic from '../../Component/ItemMusic';
import Button from '../../Component/Button';
import Title from './../../Component/Title';
import SlideImage from '../../Component/SlideImage';

import { Context } from '../../ContextGlobal/ContextGlobal';
import Particle from '../../Component/Particle';
import Description from './../../Component/Description';
import { FaDivide } from 'react-icons/fa';
import { GoChevronRight } from 'react-icons/go';


function Home() {
  const [active, setActive] = useState('Tất cả')
  const bgHome = useContext(Context)
 
  const tabTitles = ['Tất cả', 'V-pop', 'K-pop', 'Quốc tế']

  const handleBtnActive = (tabTitle) => {
    setActive(tabTitle)
  }
  
  return (
    <div>      
        <div className='w-full'>  
        {/* <Particle />  */}

          <div className='w-full pt-1 h-full'>
            <div className={`ml-60 h-full px-14 pb-24 mt-20 overflow-scrollbar ${bgHome.thumb ? '' : 'bg-primary'}`}>        
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                speed={1000}
                modules={[Autoplay, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{delay: 3000, disableOnInteraction: false }}
                className='w-full ml-60 xl:h-64 lg:h-64 select-none mt-9 '
              >
              {
                Images.map((item, index) => (
                  <SwiperSlide key={index} >
                    <SlideImage item={item}/>
                  </SwiperSlide>
                ))
              }
              </Swiper>  

              <Title title='Gần đây' classNameMore='mt-12 my-5 text-xl'/>   
              <div className='flex flex-wrap -mx-3' >
                {
                  Chills.map((item, index) => (
                      <Content key={index} description={item.card[0].desc} thumb='' dataThumb={item.card[0].thumb} classNameChild=' lazy-load' classNameParent='max-w-1/44' classNameMore='line-clamp-2' classWrapImg='px-3'/>  
                      
                    ))     
                }
              </div>  
              <Title title='Mới Phát Hành' classNameParent='mt-11 my-5 text-xl'/>       
              <Content classNameParent=''>
                <div className='flex gap-3 '> 
                    {
                      tabTitles.map((tabTitle, index) => (
                        <Button key={tabTitle} title={tabTitle} onClick={() => handleBtnActive(tabTitle)} className={`rounded-2xl select-none ${active === tabTitle ? 'bg-violet border-b-violet border-none' : ''} text-sm min-w-107 h-6 border  `} />                  
                      ))
                    }
                </div>
                <div className='flex flex-wrap mt-4'>
                  {
                    (
                      function() {
                        let musicArray;
                        switch(active) {
                          case 'Tất cả':
                            musicArray = Musics;
                            break;
                          case 'V-pop':
                            musicArray = MusicsVN;
                            break;
                          case 'K-pop':
                            musicArray = MusicsVN;
                            break;
                          case 'Quốc tế': 
                            musicArray = MusicsWorld;
                            break;
                          default:
                            musicArray = []
                        }
                        return musicArray.map((item, index) => (
                          <ItemMusic key={index} item={item} isDate className='w-full rounded-lg hover:bg-searchRose' classWrap='flex justify-between w-33 ' classSinger='text-sm' classNameMore='w-16 h-16' />
                        ))
                      }
                    )()
                  }
                </div>
              </Content>
              <Content>
                {
                  Chills.map((item, index) => (
                    <div key={index}>
                      <Title title={item.title} classNameMore='text-xl my-5'/>
                      <div className='flex flex-wrap -mx-3'>   
                          {
                            item.card.map((cardItem, index) => (                 
                              <Content key={index} description={cardItem.desc} thumb='' dataThumb={cardItem.thumb && cardItem.thumb} classTitle='line-clamp-2' classNameChild='lazy-load' classNameParent='w-1/5 mt-0' classWrapImg='px-3'/>
                            ))          
                          }
                      </div>
                    </div>
                  ))
                }
              </Content>
              <div className='flex justify-between my-5'>
                <Title title="BXH Nhạc Mới" classNameParent='text-xl'/>
                <div className='flex items-center'>
                  <Title title="TẤT CẢ" classNameParent='text-sm'/>
                  <GoChevronRight className='text-white text-md ml-1'/>
                </div>   
              </div>
              <div className='flex items-center gap-x-4 overflow-hidden mt-3'> 
                {
                  ImgBackGround.map((img, index) => (
                    <div key={index} className='w-1/3 flex items-center flex-shrink-0 h-150 bg-sidebarRose rounded-md px-4'>
                      <Content classNameParent="flex w-full">
                        <a href='#' className='block '>
                          <img src={img.src} alt={img.title} className='w-120 h-120 object-cover rounded-md' />
                        </a>    
                        <div className='ml-3 flex flex-col flex-1 justify-between'>
                          <div>
                            <Title title={img.desc}/>
                            <Description desc={img.desc.repeat(3)} />
                          </div>  
                          <div className='flex justify-between items-end'>
                            <Title title='#1' classNameParent='text-40px leading-none opacity-95' />
                            <Description desc="29.2.2024" classNameMore='text-sm text-white' className='text-4 ' />
                          </div>
                        </div>
                      </Content>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home