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
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { PiPlayCircleLight } from 'react-icons/pi';
import { LuMusic } from "react-icons/lu";


function ItemMusic({ onClick, ...props }) {
  const context = useContext(Context) 
  const iconRef = useRef(null)
  
  const [activeHeart, setActiveHeart] = useState(false)
  const [random, setRandom] = useState(0)
  const [textstroke, setTextstroke] = useState('text-stroke-any')

  const handleHeart =  () => {
    setActiveHeart(!activeHeart)
  }
  
  const handleGetInfoMusicContext = async (item) => {
    await context.setActiveAudio(true)
    return context.handleGetInfoMusic(item)
  }

  useEffect(() => {
    switch (props.number) {
      case 0: 
        setTextstroke('text-stroke-1')
        break
      case 1: 
        setTextstroke('text-stroke-2')
        break
      case 2: 
        setTextstroke('text-stroke-3')
        break
      default:
        return
    }   
  },[])

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 100))
  },[])
  
  return (
        <section className={props.classWrap}>
          {
            props.isNumberRank 
            &&
            <div className='flex items-center justify-between min-w-60px pl-3'>
              <div className={`w-60px text-center text-2rem font-black ${textstroke}`}>{props.number + 1}</div>
              {
                props.number % 2 === 0 ?
                <div className='flex flex-col justify-center items-center flex-1 gap-y-[2px]'>
                  <TiArrowSortedDown className='w-8 fill-red-500 text-lg'/>
                  <span className='text-gray-500 text-xs font-semibold'>{random}</span>
                </div>
               
                :
                props.number % 3 === 0 ?
                <div className='flex flex-col justify-center items-center flex-1 gap-y-1'>
                  <TiArrowSortedUp className='w-8 fill-green-500 text-lg'/>
                  <span className='text-gray-500 text-xs font-semibold'>{random}</span>
                </div>
                :
                <AiOutlineMinus className='w-8 fill-white flex-1' />
              }
            </div>
          }
          <div 
                className={`flex items-center w-32 p-2 ${props.isAlbum ? 'gap-x-2' : 'gap-x-4'} group/item ${props.className}`}
                onClick={onClick}
              >
                {
                  props.isAlbum && (<LuMusic className='mr-1'/>)
                }
                <div className={`relative group/parent cursor-pointer ${props.classNameMore}`} onClick={() => handleGetInfoMusicContext(props.item)}>
                  <img 
                    src={`/mp3/${props.item.thumb}`} 
                    alt={props.item.name} 
                    className='w-full h-full group-hover/item:bg-black group-hover/item:opacity-50 block rounded-md object-cover border-black'                
                  />
                  {
                    context.infoMusic === props.item 
                    ?
                      <div className='w-full h-full flex items-center justify-center text-center absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-musicBgColor shadow-musicShadow rounded-md'>                      
                          {
                            context.activeAudio
                            ? (<img src='./mp3/gifWaveMusic/icon-playing.gif' alt='gif' className='w-1/3 inline-block ' />)
                            : (<PiPlayCircleLight className='w-1/3 text-4xl' />)
                          
                            

                          }                      
                      </div>
                    :
                      null
                  }
                  <FaPlay className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden text-white text-xl group-hover/item:block group-hover/item:opacity-90' />
                </div>
                <div className={`${props.isAlbum ? 'flex-2' : 'flex-2'} flex flex-col justify-center leading-none  font-semibold`}>
                  <div className='flex items-center capitalize text-white text-sm '>
                    <h4 className={`${props.classTitle} line-clamp-1`}>{props.item?.name}</h4> 
                    <Label title={props.item?.premium} />                
                  </div>
                  <div>
                    <Link to='./zingchart' className={`text-textZingchart inline hover:underline hover:text-violet ${props.classSinger}`}>{props.item.singer}</Link>
                  </div>
                  {props.isDate && <span className='text-xs text-textZingchart'>{props.item?.date}</span>}
                </div>
                <div className={`${props.isAlbum ? 'flex-2' : '' }`}>
                  {
                    props.isAlbum && (<p>{props.item?.album}</p>)
                  }
                </div>
                {props.children}
                <div className={props.classIcon}>
                  {
                    props.isIcon && 
                    <div ref={iconRef} className='items-center hidden gap-2 group-hover/item:flex'>
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