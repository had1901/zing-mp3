import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Label from './Label';
import { Context } from '../ContextGlobal/ContextGlobal';
import { LiaMicrophoneAltSolid } from 'react-icons/lia';
import BtnRadius from './BtnRadius';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { AiOutlineMinus } from 'react-icons/ai';

function ItemMusic({ onClick, ...props }) {
  const [activeHeart, setActiveHeart] = useState(false)
  const [textstroke, setTextstroke] = useState('text-stroke-any')
  const iconRef = useRef(null)
  const contextMusic = useContext(Context) 

  const handleHeart =  () => {
    setActiveHeart(!activeHeart)
  }
  useEffect(() => {
    switch (props.number) {
      case 0:
        setTextstroke('text-stroke-0')
        break
      case 1: 
        setTextstroke('text-stroke-1')
        break
      case 2: 
        setTextstroke('text-stroke-2')
        break
      case 3: 
        setTextstroke('text-stroke-3')
        break
      default:
        return
    }   
  },[])
  
  return (
        <section className={props.classWrap}>
          {
            props.isNumberRank 
            &&
            <div className='flex items-center justify-between min-w-60px gap-x-2 pl-3'>
              <div className={`w-60px text-center text-2rem font-black ${textstroke}`}>{props.number === 0 ? (<p>Gợi ý</p>) : props.number}</div>
              {props.number !== 0  && <AiOutlineMinus className='mx-1' />}
            </div>
          }
          <div 
                className={`flex items-center w-32 p-2 gap-x-4 group/item ${props.className}`}
                onClick={onClick}
              >
                <div className={`relative group/parent cursor-pointer ${props.classNameMore}`} onClick={() => contextMusic.handleGetInfoMusic(props.item)}>
                  <img 
                    src={`/mp3/${props.item.thumb}`} 
                    alt={props.item.name} 
                    className='w-full h-full group-hover/item:bg-black group-hover/item:opacity-50 block rounded-lg object-cover border-black'                
                  />
                  {
                    contextMusic.infoMusic === props.item 
                    ?
                      <div className='w-full h-full flex items-center justify-center text-center absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-musicBgColor shadow-musicShadow rounded-md'>                      
                          <img src='./mp3/gifWaveMusic/icon-playing.gif' alt='gif' className='w-1/3 inline-block ' />                      
                      </div>
                    :
                      null
                  }
                  <FaPlay className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden text-white text-xl group-hover/item:block group-hover/item:opacity-90' />
                </div>
                <div className='flex flex-col justify-center leading-none flex-2 font-semibold'>
                  <div className='flex items-center capitalize text-white text-sm '>
                    <h4 className={props.classTitle}>{props.item.name}</h4> 
                    <Label title={props.item.premium} />                
                  </div>
                  <div>
                    <Link to='./zingchart' className={`text-textZingchart inline hover:underline hover:text-violet ${props.classSinger}`}>{props.item.singer}</Link>
                  </div>
                  {props.isDate && <span className='text-xs text-textZingchart'>{props.item.date}</span>}
                </div>
                {props.children}
                <div className={props.classIcon}>
                  {
                    props.isIcon && 
                    <div ref={iconRef} className='flex items-center hidden gap-2 group-hover/item:flex'>
                      <BtnRadius>
                        <LiaMicrophoneAltSolid />
                      </BtnRadius>                   
                      <BtnRadius onClick={handleHeart}>
                        {
                          activeHeart  ? (<GoHeartFill />) : (<GoHeart />)
                        }
                      </BtnRadius>
                    </div>
  
                  }
                  <IoIosMore className='mr-2 hover:bg-searchRose text-gray-400 hover:text-white hidden w-4 h-4 box-content p-2 cursor-pointer rounded-full font-bold group-hover/item:block' />
                  {
                    props.isTimeString 
                    &&
                    <span className='text-xs text-textZingchart font-normal group-hover/item:hidden'>{props.item.timeString}</span>
                  }
                </div>
          </div>
        </section>
  )
}

export default ItemMusic