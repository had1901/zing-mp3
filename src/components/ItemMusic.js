/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Label from './Label';
import { Context } from '../context/ContextGlobal';
import { LiaMicrophoneAltSolid } from 'react-icons/lia';
import BtnRadius from './BtnRadius';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { AiOutlineMinus } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { LuMusic } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ItemMusic({ onClick, ...props }) {
  const iconRef = useRef(null)
  const context = useContext(Context)
  const [activeHeart, setActiveHeart] = useState(false)
  const [random, setRandom] = useState(0)
  const [textstroke, setTextstroke] = useState('text-stroke-any')

  const state = useSelector(state => state.getInfoSongReducer)
  const state2 = useSelector(state => state.backgroundReducer)
  const dispatch = useDispatch()
  
  const handleHeart =  () => {
    setActiveHeart(!activeHeart)
  }
  
  const handleGetInfoMusic = (item) => {
    dispatch(actions.getInfoSongAction({ 
      song: item, 
      activeAudio: true, 
      autoPlay: true,
      prevSong: false,
      nextSong: false
    }))
    context.handleListenNear(item)
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
        <section id={props.item?.id} className={props.classWrap}>
          {
            props.isNumberRank 
            &&
            (<div className='flex items-center justify-between min-w-60px pl-3'>
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
            </div>)
          }
          <div className={`relative flex items-center w-32 p-2 ${props.isAlbum ? 'gap-x-2' : 'gap-x-4'} group/item ${props.className}`} onClick={onClick}>
                {
                  props.isAlbum && (<LuMusic className='mr-1'/>)
                }
                <div className={`relative group/parent cursor-pointer ${props.classNameMore}`} onClick={() => handleGetInfoMusic(props.item)}>
                  <img 
                    src={`/mp3/imgMusic/${props.item?.information?.thumb || <Skeleton />}`} 
                    alt={props.item?.name?.song} 
                    className='w-full h-full group-hover/item:bg-black group-hover/item:opacity-50 block rounded-md object-cover border-black'                
                  />
                  {
                    state.infoSong === props.item 
                    ?(<div className='w-full h-full flex items-center justify-center text-center absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-musicBgColor shadow-musicShadow rounded-md'>                      
                          {
                            state.activeAudio
                            ? (<img src='./mp3/gifWaveMusic/icon-playing.gif' alt='gif' className='w-1/3 inline-block ' />)
                            : (<FaPlay className='w-1/3 text-4xl' />)
                          }                      
                      </div>)
                    :
                      null
                  }
                  <FaPlay className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden ${state2.textColor} text-xl group-hover/item:block group-hover/item:opacity-90`}/>
                </div>
                <div className={`${props.isAlbum ? 'flex-2' : 'flex-2'} flex flex-col justify-center leading-none  font-semibold`}>
                  <div className={`flex items-center capitalize ${state2.textColor} text-sm`}>
                    <h4 className={`${props.classTitle}  line-clamp-1`}>{props.item?.name?.song || <Skeleton />}</h4> 
                    <Label title={props.item?.desc?.premium || <Skeleton />} />                
                  </div>
                  <div>
                    <Link to='./zingchart' className={`${state2.textColor} inline hover:underline hover:text-violet ${props.classSinger}`}>{props.item?.name?.singer}</Link>
                  </div>
                  {props.isDate && <span className={`text-xs ${state2.textColor}`}>{props.item?.desc?.date || <Skeleton />}</span>}
                </div>
                <div className={`${props.isAlbum ? 'flex-2 text-xs text-[#ffffff80]' : '' }`}>
                  {
                    props.isAlbum && (<p>{props.item?.information?.album}</p>)
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
                  <IoIosMore className={`absolute right-0 top-1/2 -translate-y-1/2 mr-2 hover:bg-searchRose text-gray-400 hover:${state2.textColor} hidden w-4 h-4 box-content p-2 cursor-pointer rounded-full font-bold group-hover/item:block`} />
                  {
                    props.isTimeString 
                    &&
                    <span className='min-w-[40px] flex-1 text-xs text-textZingchart font-normal group-hover/item:hidden'>{props.item?.timeString}</span>
                  }
                </div>
          </div>
        </section>
  )
}

export default ItemMusic