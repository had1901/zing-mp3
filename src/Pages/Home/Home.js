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


function Home() {
  const [active, setActive] = useState('Tất cả')
  const bgHome = useContext(Context)
 
  const handleBtnActive = (title) => {
    setActive(title)
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
                  <Button 
                    title='Tất cả' 
                    onClick={() => handleBtnActive('Tất cả')} 
                    className={`rounded-2xl select-none ${active === 'Tất cả' ? 'bg-violet border-b-violet border-none' : ''} text-sm min-w-107 h-6 border  `}>
                  </Button>
                  <Button 
                    title='V-pop' 
                    onClick={() => handleBtnActive('V-pop')} 
                    className={`rounded-2xl select-none ${active === 'V-pop' ? 'bg-violet border-b-violet border-none' : ''} text-sm min-w-107 h-6 border  `}>
                  </Button>
                  <Button 
                    title='K-pop' 
                    onClick={() => handleBtnActive('K-pop')} 
                    className={`rounded-2xl select-none ${active === 'K-pop' ? 'bg-violet border-b-violet border-none' : ''} text-sm min-w-107 h-6 border  `}>
                  </Button>
                  <Button 
                    title='Quốc tế' 
                    onClick={() => handleBtnActive('Quốc tế')} 
                    className={`rounded-2xl select-none ${active === 'Quốc tế' ? 'bg-violet border-b-violet border-none' : ''} text-sm min-w-107 h-6 border  `}>
                  </Button>
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
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home