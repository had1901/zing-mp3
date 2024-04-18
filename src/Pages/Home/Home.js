import React, { useContext, useEffect, useState } from 'react'
import '../../../src/index.css';

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
import Description from './../../Component/Description';
import { GoChevronRight } from 'react-icons/go';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemImage from './../../Component/ItemImage';
import { zingchartList } from '../../images/imgZingchart/zingchart';
import ContainerMain from '../../Component/ContainerMain';

function Home() {
  const [active, setActive] = useState('Tất cả')
  const [itemSlideScreen, setItemSlideScreen] = useState(4)
  const bgHome = useContext(Context)

  const tabTitles = ['Tất cả', 'V-pop', 'K-pop', 'Quốc tế']

  useEffect(() => {
    const handleToShowSlide = () => {
      const windowWidth = window.innerWidth
        if(windowWidth >= 1340) {
          setItemSlideScreen(4)
        } else if(windowWidth >= 1024) {
          setItemSlideScreen(3)
        } else if(windowWidth >= 768) {
          setItemSlideScreen(2)
        } else {
          setItemSlideScreen(1)
        }
      }
    window.addEventListener('resize', handleToShowSlide)
    handleToShowSlide()
    return () => window.removeEventListener('resize', handleToShowSlide)
  },[])
  

  const handleBtnActive = (tabTitle) => {
    setActive(tabTitle)
  }
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
  };

  return (
    <ContainerMain>    
        {/* <Particle />  */}
        <div className={`${bgHome.thumb ? '' : 'bg-primary'}`}>        
              <Swiper
                spaceBetween={20}
                slidesPerView={itemSlideScreen}
                loop={true}
                speed={1000}
                modules={[Autoplay, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{delay: 3000, disableOnInteraction: false }}
                className='w-full xl:h-fit lg:h-fit select-none'
              >
                  {
                    Images.map((item, index) => (
                      <SwiperSlide key={index} className='h-fit' >
                        <SlideImage item={item}/>
                      </SwiperSlide>
                    ))
                  }
              </Swiper>  

              <Title title='Gần đây' classNameMore='mt-12 mb-5 mt-10 text-xl'/>   
              <div className='flex flex-wrap -mx-3' >
                  {
                    Chills.map((item, index) => (
                        <Content key={index} description={item.card[0].desc} dataThumb={item.card[0].thumb} classNameChild='lazy-load' classNameParent='w-1/44 shrink-0' classNameMore='line-clamp-2' classWrapImg='px-3'/>                
                      ))     
                  }
              </div>  
              <Title title='Mới Phát Hành' classNameParent='mt-11 mb-5 mt-10 text-xl'/>       
              <Content>
                <div className='flex gap-3 '> 
                    {
                      tabTitles.map((tabTitle, index) => (
                        <Button key={tabTitle} title={tabTitle} onClick={() => handleBtnActive(tabTitle)} className={`rounded-2xl select-none ${active === tabTitle ? 'bg-violet border-b-violet border-none' : ''} text-sm min-w-107 h-6 border  `} />                  
                      ))
                    }
                </div>
                <section className='grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 mt-4'>
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
                          <ItemMusic key={index} item={item} isDate className='w-full rounded-lg hover:bg-searchRose' classWrap='flex justify-between' classSinger='text-sm' classNameMore='w-16 h-16' />
                        ))
                      }
                    )()
                  }
                </section>
              </Content>
              <Content>
                {
                  Chills.map((item, index) => (
                    <div key={index}>
                      <Title title={item.title} classNameMore='text-xl mb-5 mt-10'/>
                      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 -mx-3'>   
                          {
                            item.card.map((cardItem, index) => (                 
                              <Content key={index} description={cardItem.desc} thumb='' dataThumb={cardItem.thumb && cardItem.thumb} classTitle='line-clamp-2' classNameChild='lazy-load' classNameParent='mt-0' classWrapImg='px-3'/>
                            ))          
                          }
                      </div>
                    </div>
                  ))
                }
              </Content>
              <div className='flex justify-between mb-5 mt-10'>
                <Title title="BXH Nhạc Mới" classNameParent='text-xl'/>
                <div className='flex items-center'>
                  <Title title="TẤT CẢ" classNameParent='text-sm'/>
                  <GoChevronRight className='text-white text-md ml-1'/>
                </div>   
              </div>

              {/* Slider show */}
              <div className="slider-container">
                <Slider {...settings} className='new-song snap-x mt-3'>
                  {
                    ImgBackGround.map((img, index) => (
                      <div key={index} className='w-[calc((100%_/_3)_-_11px)] flex items-center snap-center flex-shrink-0 h-150 bg-sidebarRose rounded-md p-4'>
                        <Content classNameParent="flex w-full">
                          <a href='#!' className='block'>
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
                </Slider>
              </div>

              {/* ZingChart img */}
              <section className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7 mt-7'>
                {
                  zingchartList.map((item,index) => (
                    <ItemImage key={index} >
                      <img src={`../images/imgZingchart/${item}`} alt='zingchart' className='w-full rounded-md' />
                    </ItemImage>
                  ))
                }
              </section>

              <Content>
                {
                  Chills.slice(0, 2).map((item, index) => (
                    <div key={index}>
                      <Title title={item.title} classNameMore='text-xl mb-5 mt-10'/>
                      <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 -mx-3'>   
                          {
                            item.card.map((cardItem, index) => (                 
                              <Content key={index} description={cardItem.desc} thumb='' dataThumb={cardItem.thumb && cardItem.thumb} classTitle='line-clamp-2' classNameChild='lazy-load' classNameParent='mt-0' classWrapImg='px-3'/>
                            ))          
                          }
                      </div>
                    </div>
                  ))
                }
              </Content>
        </div> 
    </ContainerMain>
  )
}

export default Home