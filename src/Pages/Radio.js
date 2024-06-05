import React, { useState } from 'react'
import { Musics } from '../mp3/Music/Music';
import ItemImage from './../components/ItemImage';
import ContainerMain from './../components/ContainerMain';
import Content from './../components/Content';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from './../components/Title';

import img1 from '../images/imgTopic/countries/img-kpop.jpg';

function Radio() {

  const settings3 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };

  return (
    <ContainerMain>
    <Title title='Radio' classNameMore='text-xxl capital'/>
      <Content classNameParent='slider-container '>
        <Slider {...settings3} className='radio-song'>
          {
            Musics.slice(0, 14).map((music, index) => (
              <ItemImage key={index} classNameParent='flex-shrink-0 '>
                <div className='relative '>
                  <div className='w-200 h-200 relative rounded-full border-[6px] border-red-600 overflow-hidden group/parentRadio'>
                    <img src={`../../mp3/${music.thumb}`} alt={music.name} className='block w-full h-full object-cover cursor-pointer hover:scale-110 transition-all duration-500 delay-75 '/>
                    <span className='invisible absolute inset-0 group-hover/parentRadio:bg-gray-800 group-hover/parentRadio:visible group-hover/parentRadio:bg-opacity-40 transition-all duration-100 delay-75 '></span>
                  </div>
                  <img src={`../../mp3/${music.thumb}`} alt={music.name} className='block absolute bottom-0 right-0 w-16 h-16 rounded-full border-black object-cover border-2' />
                  <span className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 text-center rounded-md text-white bg-red-500 capitalize '>Live</span>
                </div>
                <h2 className='mt-4 text-center font-semibold'>{music.singer}</h2>
                <p className='text-center text-xs text-gray-400 font-medium'>
                  {music.listening} 
                  <span className='ml-1 '>đang nghe</span>
                </p>
              </ItemImage>
            ))
          }
        </Slider>
      </Content>
      <Content classNameParent='mt-20'>
        <Title title='Kênh' classNameParent='ml-5'/>
        <div className='flex items-center gap-3'>
          <div className='flex flex-col items-center w-[108px] bg-[#2f2739] rounded-md py-2 gap-5'>
            <img src={img1} alt='' className='w-[60px] h-[60px] object-cover rounded-full'/>
            <img src={img1} alt='' className='w-[60px] h-[60px] object-cover rounded-full'/> 
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <div className='flex gap-2 bg-[#2f2739] rounded-md p-2 '>
              <img src={img1} alt='' className='w-[60px] h-[60px] object-cover rounded-full'/>
              <div >
                <h3 className='text-white text-md font-semibold'>Hello</h3>
                <p className='text-[#ffffff80] text-xs mt-1'>15:00 - 18:00</p>
              </div>
            </div>
           
            <div className='flex gap-2 bg-[#2f2739] rounded-md p-2'>
              <img src={img1} alt='' className='w-[60px] h-[60px] object-cover rounded-full'/>
              <div>
                <h3 className='text-white text-md font-semibold'>Hello</h3>
                <p className='text-[#ffffff80] text-xs mt-1'>15:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
       

      </Content>
    </ContainerMain>
  )
}

export default Radio