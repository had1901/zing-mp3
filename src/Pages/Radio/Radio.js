import React, { useState } from 'react'
import { Musics } from './../../mp3/Music/Music';
import ItemImage from './../../Component/ItemImage';
import ContainerMain from '../../Component/ContainerMain';
import Content from '../../Component/Content';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from '../../Component/Title';

import img1 from '../../images/imgTopic/countries/img-usuk.jpg';

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
      <Content>
        <div className='flex flex-col'>
          <Title title='Kênh'/>
          <div>
            <img src={img1} alt=''/>
            <img src={img1} alt=''/> 
          </div>
          <div className='grid auto-cols-auto'>
            <img src={img1} alt=''/>
            <img src={img1} alt=''/> 
          </div>
        </div>
       

      </Content>
    </ContainerMain>
  )
}

export default Radio