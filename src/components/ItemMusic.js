/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import Label from './Label';
import { Context, useGlobalRef } from '../context/ContextGlobal';
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
import { motion, AnimatePresence } from "framer-motion"

function ItemMusic({ onClick, ...props }) {
  const { audio, isLoadMetaAudio, setIsLoadMetaAudio, play, setPlay } = useGlobalRef()

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
  
  const handleGetInfoMusic = (song) => {
    dispatch(actions.getInfoSongAction({ 
      song: song, 
      activeAudio: true, 
      isChanged: false
    }))
    let isPlaying = 
      audio.current.currentTime > 0 
      && !audio.current.paused 
      && !audio.current.ended 
      && audio.current.readyState > audio.current.HAVE_CURRENT_DATA

    audio.current.currentTime = 0
    setIsLoadMetaAudio(true)
    setPlay(true)
    // if (!isPlaying) {
      audio.current.load()
      audio.current.addEventListener('canplay', () => {
          setIsLoadMetaAudio(false)
          audio.current.play()
      })
    // }
    context.handleListenNear(song)
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


  if(!props.song) {
    return <p>Loading...</p>
  }

  return (
        <motion.section id={props.song?.id} className={props.classWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
          <div className={`relative flex w-32 p-2 ${props.isAlbum ? 'gap-x-2' : 'gap-x-4'} group/item ${props.className}`} onClick={onClick}>
                {
                  props.isAlbum && (<LuMusic className='mr-1'/>)
                }
                <div className={`relative group/parent cursor-pointer ${props.classNameMore}`} onClick={() => handleGetInfoMusic(props.song)}>
                  <img 
                    // src={`/mp3/imgMusic/${props.song?.information?.thumb || <Skeleton />}`} 
                    src={`${props.song?.thumbnail || 'https://res.cloudinary.com/mp3-img/image/upload/v1723920725/img13_liunio.webp'}`} 
                    alt={props.song?.title} 
                    className='w-full h-full group-hover/item:bg-[#00000080] group-hover/item:opacity-50 block rounded-md object-cover border-black'                
                  />
                  {
                    state.song === props.song 
                    ?(<div className='w-full h-full flex items-center justify-center text-center absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-musicBgColor shadow-musicShadow rounded-md'>                      
                          {
                            play
                            ? (<img src='./mp3/gifWaveMusic/icon-playing.gif' alt='gif' className='w-1/3 inline-block ' />)
                            : (<FaPlay className='w-1/3 text-xl' />)
                          }                      
                      </div>)
                    :
                      null
                  }
                  <FaPlay className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden ${state2.textColor} ${!props.noBtnPlay ? 'text-xl' : 'text-md'} group-hover/item:block group-hover/item:opacity-90`}/>
                </div>
                <div className={`${props.isAlbum ? 'flex-2' : 'flex-2'} leading-none font-semibold`}>
                  <div className={`flex items-center capitalize ${state2.textColor} text-sm`}>
                    <h4 className={`${props.classTitle}  line-clamp-1`}>{props.song?.title || <Skeleton />}</h4> 
                    <Label title={props.song?.desc?.premium || <Skeleton />} />                
                  </div>
                  <div>
                    <Link to='/zingchart' className={`${state2.textColor} inline hover:underline hover:text-violet ${props.classSinger}`}>{props.song?.artist}</Link>
                  </div>
                  {props.isDate && <span className={`text-xs ${state2.textColor}`}>{props.song?.releaseDate || <Skeleton />}</span>}
                </div>
                <div className={`${props.isAlbum ? 'flex-2 text-xs text-[#ffffff80]' : '' }`}>
                  {
                    props.isAlbum && (<p>{props.song?.album}</p>)
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
                      <BtnRadius title={activeHeart ? 'Xóa yêu thích' : 'Yêu thích'} placement='top' onClick={handleHeart}>
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
                    <span className='min-w-[40px] flex-1 text-xs text-textZingchart font-normal group-hover/item:hidden'>{props.song?.duration}</span>
                  }
                </div>
          </div>
        </motion.section>
  )
}

export default ItemMusic