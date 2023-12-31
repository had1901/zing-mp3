import React, { useContext, useEffect, useRef, useState } from 'react'

import { GoHeart, GoHeartFill, GoVideo } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { LiaMicrophoneAltSolid, LiaRandomSolid, } from 'react-icons/lia';
import { PiPauseCircleLight, PiPlayCircleLight } from 'react-icons/pi';
import { VscChromeRestore } from 'react-icons/vsc';
import { HiOutlineVolumeUp } from 'react-icons/hi';
import { BsMusicNoteList } from 'react-icons/bs';
import { RxTrackPrevious, RxTrackNext, RxLoop } from 'react-icons/rx';

import BtnRadius from '../../Component/BtnRadius';
import InputRange from '../../Component/InputRange';
import { Context } from '../../ContextGlobal/ContextGlobal';

import { IoIosMusicalNote, IoIosMusicalNotes, IoMdMusicalNote } from 'react-icons/io';
import { PiMusicNoteSimpleFill } from 'react-icons/pi';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ControlAudio() {
  const min = 0
  const max = 100
  const [valueAudio, setValueAudio] = useState(0)
  const [valueVolume, setValueVolume] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeAudio, setActiveAudio] = useState(false)
  const [activeHeart, setActiveHeart] = useState(false)
  const [activeLoop, setActiveLoop] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [curTime, setCurTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  
  const audio = useRef()
  const contextAudio = useContext(Context)

  useEffect(() => {
    if(isPlaying) {
      audio.current.play()
      console.log("Playing...")
      if(isPlaying && audio.current.play) {
        setActiveAudio(true)
      }
      audio.current.addEventListener('ended', () => {
        setIsPlaying(false)
        setCurTime(0)
        setActiveAudio(false)
        console.log('Ended');
        console.log('Play', isPlaying);
        console.log('Active', activeAudio);
      })
      
    } else {
      audio.current.pause()
      console.log("Pause")
    }
  
  }, [isPlaying, activeAudio])

  const handleAudio = () => {
    setActiveAudio(!activeAudio)
    setIsPlaying(!isPlaying)
  }

  const onPlay = () => {
    const duration = audio.current.duration
    const currentTime = audio.current.currentTime
    setCurTime(currentTime / duration * 100) 
    convertSecondsToTime(Math.floor(duration))
  }
  
  function convertSecondsToTime(seconds) {
    // Chia số giây thành phần phút và phần giây
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Định dạng phần phút và phần giây thành chuỗi với đủ số chữ số
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');
  
    // Kết hợp thành biểu thức thời gian dạng "00:00 phút"
    const timeExpression = `${minutesString}:${secondsString}`;
    
    return setTotalTime(timeExpression);
  }
   
  const handleHeart = () => {
    setActiveHeart(!activeHeart)
  }

  const handleLoop = () => {
    setActiveLoop(!activeLoop)
  }
 
  return (
    <div className={` ${contextAudio.controlAudio} h-91 fixed bottom-0 flex justify-center w-full text-white border-t-1 border-zinc-700 z-50`}>
      <div className='w-full text-white pr-5 pl-7 mx-auto flex justify-between items-center'>
        <div className='flex items-center flex-1'>
          <div className='flex items-center min-w-235 max-w-235'>
            <div className='relative shrink-0'>
              <img 
                src=
                { 
                  contextAudio.infoMusic 
                  ?
                  `./mp3/${contextAudio.infoMusic.thumb}`
                  :
                   'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
                }
                alt='img'
                className={`w-16 h-16 block object-cover rounded-full ${isPlaying && 'animate-spin-rotate'}`}
              />         
              <div className='absolute left-0 bottom-0 w-14 h-14 bg-transparent rounded-full'>
                <IoMdMusicalNote className='absolute -bottom-2 left-2/4 -translate-x-2/4 animate-m1-animate' />
                <IoMdMusicalNote className='absolute -bottom-2 text-xl left-2/4 animate-m2-animate' />
                <PiMusicNoteSimpleFill className='absolute text-sm -bottom-2 left-2/4 animate-m3-animate' />
                <PiMusicNoteSimpleFill className='absolute -bottom-2  left-1/3 animate-m4-animate' />
                <IoIosMusicalNote className='absolute -bottom-3 left-2/4 animate-m5-animate' /> 
                <IoIosMusicalNote className='absolute -bottom-3 left-1/3 animate-m1-animate' />
                <IoIosMusicalNotes className='absolute -bottom-3 left-2/4 animate-m6-animate' />
              </div>
            </div>
            <div className='mx-3 flex flex-col '>
              <h3 className='text-sm font-semibold line-clamp-2'>{contextAudio.infoMusic ? contextAudio.infoMusic.name : 'Not found' || 'Name Song'}</h3>
              <span className='text-xs text-zinc-500 font-medium'>{contextAudio.infoMusic ? contextAudio.infoMusic.singer : 'Not found' || 'Singer'}</span>
            </div>
          </div>
          <div className='flex items-center mx-4 gap-1 text-white'> 

          <audio ref={audio} src={`../../mp3/Music/${contextAudio.path}`} autoPlay hidden controls onTimeUpdate={onPlay}></audio>      

            <BtnRadius onClick={handleHeart}>
              {
                activeHeart  ? (<GoHeartFill />) : (<GoHeart />)
              }
            </BtnRadius>
            <BtnRadius>
              <IoIosMore />
            </BtnRadius>
          </div>
        </div>
        <div className='text-xl flex-3 flex-col items-center justify-center h-full'>
          <div className='flex items-center text-xl justify-center gap-3 h-12 mt-2'>
            <BtnRadius>
              <LiaRandomSolid />
            </BtnRadius>
            <BtnRadius>
              <RxTrackPrevious />
            </BtnRadius>
            <BtnRadius props='hover:bg-transparent' onClick={handleAudio}>
              <div class>
                {
                  activeAudio 
                  ?
                    (<PiPauseCircleLight className='text-5xl' />)
                  :
                    (<PiPlayCircleLight className='text-5xl' />)
                } 
              </div>
            </BtnRadius>
            <BtnRadius>
              <RxTrackNext />
            </BtnRadius>
            <BtnRadius onClick={handleLoop} className='group'>
              {
                activeLoop 
                ? 
                  (<div className='relative group'>
                    <RxLoop className=' text-violet ' />
                    <span className='absolute top-0 left-[60%] text-ss group-hover:bg-gray-700 text-violet bg-navBar text-center rounded-full w-9px h-10px leading-3'>1</span>
                  </div>)
                : 
                  (<RxLoop  />)                            
              }
            </BtnRadius>
          </div>
          <div className='flex items-center justify-center gap-2 h-6'>
            <span id='time-line' className='text-sm font-medium text-zinc-500 shrink-0 select-none'>{curTime ? Math.floor(curTime) : '00:00'}</span>
            <div className='control flex items-center cursor-pointer group/parent w-3/4 py-1 '>
              <InputRange curTime={curTime} valueAudio={valueAudio} min={min} max={max} onChange={(e) => setValueAudio(max)} />   
              {/* <audio controls id='audio' src={`${Musics[0].path}`} >
                <source  type='audio/mpeg'></source>
              </audio> */}
            </div>
            <span id='time-total' className='text-sm font-medium shrink-0 select-none'>{totalTime ? totalTime : '00:00'}</span>
          </div>
          <div>
            
          </div>
        </div>
        <div className='flex flex-1 items-center gap-10'>
          <div className='w-full flex relative justify-end items-center gap-3 text-xl after:w-px after:bg-slate-500 after:h-full after:-right-5 after:top-0 after:block after:absolute'>
            <BtnRadius>
              <GoVideo />
            </BtnRadius>
            <BtnRadius>
              <LiaMicrophoneAltSolid />
            </BtnRadius>
            <BtnRadius>
              <VscChromeRestore />
            </BtnRadius>
            <div className='flex items-center gap-1'>
              <BtnRadius>
                <HiOutlineVolumeUp />
              </BtnRadius>
              <div className='control flex items-center cursor-pointer transition-all group/parent w-3/4 '>         
                <InputRange valueVolume={valueVolume} min={min} max={max} onChange={(e) => setValueVolume(max)} />            
              </div>
            </div>
          </div>
          <span className=''>
            <BtnRadius props='bg-gray-700 rounded-sm p-1'>
              <BsMusicNoteList />
            </BtnRadius>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ControlAudio