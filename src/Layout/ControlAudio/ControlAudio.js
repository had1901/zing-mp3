import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { GoHeart, GoHeartFill, GoVideo } from 'react-icons/go';
import { IoIosMore, IoIosPause, IoIosPlay, IoMdPause, IoMdPlay } from 'react-icons/io';
import { LiaMicrophoneAltSolid, LiaRandomSolid, } from 'react-icons/lia';
import { PiPauseCircleLight, PiPlayCircleLight } from 'react-icons/pi';
import { VscChromeRestore } from 'react-icons/vsc';
import { HiOutlineVolumeUp } from 'react-icons/hi';
import { BiVolumeMute } from "react-icons/bi";
import { BsMusicNoteList } from 'react-icons/bs';
import { RxTrackPrevious, RxTrackNext, RxLoop } from 'react-icons/rx';

import BtnRadius from '../../Component/BtnRadius';
import { Context } from '../../ContextGlobal/ContextGlobal';


import 'react-loading-skeleton/dist/skeleton.css'
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/actions';

const ControlAudio = memo(() => {
  const audio = useRef()
  const inputVolume = useRef()
  const inputRangeSong = useRef()
  const clickSetTimeAudioRef = useRef()
  const context = useContext(Context)
  const step = 0.01

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [getSong, setGetSong] = useState('mp3')
  
  const [prevVolume, setPrevVolume] = useState(0.5)
  const [valueInputSong, setValueInputSong] = useState(0)
  const [minValueInputSong, setMinValueInputSong] = useState(0)
  const [maxValueInputSong, setMaxValueInputSong] = useState(100)

  const [valueVolume, setValueVolume] = useState(0.5)
  const [minVolume, setMinVolume] = useState(0)
  const [maxVolume, setMaxVolume] = useState(1)
  const [mutedVolume, setMutedVolume] = useState(null)

  const [activeHeart, setActiveHeart] = useState(false)
  const [activeLoop, setActiveLoop] = useState(false)
  const [curTime, setCurTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isRandom, setIsRandom] = useState(false)

  const state = useSelector(state => state.backgroundReducer)
  const stateSong = useSelector(state => state.getInfoSongReducer)
  const dispatch = useDispatch()

  
  // Hàm update thời lượng khi bài hát đang phát
  const handleTimeUpdateAudio = useCallback(() => {
      if(audio.current) {
        const duration = audio.current.duration // Lấy ra tổng thời gian của bài hát
        const currentTime = audio.current.currentTime // Lấ  ra thời gian hiện tại của bài hát ( đang phát )
        if(!isNaN(currentTime) && !isNaN(duration)) {
          setCurTime((currentTime / duration) * 100) 
          convertSecondsToTotalTime(Math.floor(duration))    
          convertSecondsToCurrentTime(Math.floor(currentTime))
          handleTimeAudio(currentTime, duration)
        }
      }
  },[])

  // Tính toán chuyển đổi TỔNG thời lượng của bài bát sang định dạng thời gian (00:00)
  const convertSecondsToTotalTime = (seconds) => {
    // Chia số giây thành phần phút và phần giây
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Định dạng phần phút và phần giây thành chuỗi với đủ số chữ số
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');
    // Kết hợp thành biểu thức thời gian dạng "00:00 phút
    const timeExpression = `${minutesString}:${secondsString}`;

    return setTotalTime(timeExpression);
  }

  // Tính toán chuyển đổi thời lượng HIỆN TẠI của bài bát sang định dạng thời gian (00:00)
  const convertSecondsToCurrentTime = (seconds) => {
    // Chia số giây thành phần phút và phần giây
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Định dạng phần phút và phần giây thành chuỗi với đủ số chữ số
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');
    // Kết hợp thành biểu thức thời gian dạng "00:00 phút"
    const timeExpression = `${minutesString}:${secondsString}`;
    
    return setCurTime(timeExpression);
  }
   
  // Ngăn chặn sự kiện nổi bọt
  const handleStopPropagation = (e) => {
    e.stopPropagation()
  }

  // Yêu thích bài hát
  const handleHeart = (e) => {
    e.stopPropagation()
    setActiveHeart(!activeHeart)
  }

  // Bài hát ngẫu nhiên
  const handleRandomSong = (e) => {
    e.stopPropagation()
    setIsRandom(!isRandom)
  }

  // Chuyển bài hát trước đó
  const handlePrevious = (e) => {
    e.stopPropagation()
    if(isRandom) {
      setCurrentSongIndex(Math.floor(Math.random() * data.length))
    } else {
      setCurrentSongIndex(prevIndex => (prevIndex - 1 + data.length) % data.length)
      dispatch(actions.getInfoSongAction({ prevSong: true }))
    }
    dispatch(actions.getInfoSongAction({ activeAudio: true, prevSong: true }))
  }

  // Chuyển bài hát tiếp theo
  const handleNext = (e) => {
    e.stopPropagation()
    if(isRandom) {
      setCurrentSongIndex(Math.floor(Math.random() * data.length))
    } else {
      setCurrentSongIndex(prevIndex => (prevIndex + 1) % data.length)
      dispatch(actions.getInfoSongAction({ nextSong: true }))
    }
    dispatch(actions.getInfoSongAction({ activeAudio: true, nextSong: true }))
  }

  // Vòng lặp phát lại bài hát
  const handleLoop = (e) => {
    e.stopPropagation()
    setActiveLoop(!activeLoop)
  }

  // Điều hướng đến album của bài hát đang phát
  const handleDetailSong = () => {
    navigate(`/album/${stateSong.infoSong.song.information.album}`)
  }

  // Đóng mở menu bên phải
  const handleOpenSidebarRight = (e) => {
    e.stopPropagation()
    dispatch(actions.openSidebarRightAction(false))
  }

  // Phát bài hát
  const handlePlaySong = async (e) => {
    e.stopPropagation()
    await handleTimeUpdateAudio()
    await audio.current.play()
    dispatch(actions.getInfoSongAction({ activeAudio: true }))
  }

  // Tạm dừng bài hát
  const handlePauseSong = async (e) => {
    e.stopPropagation()
    await handleTimeUpdateAudio()
    await audio.current.pause()
    dispatch(actions.getInfoSongAction({ activeAudio: false }))
  }

  const handleClickSetTimeAudio = useCallback((e) => {
    let width = clickSetTimeAudioRef.current.clientWidth
    const timeDuration = audio.current.duration
    const offset = e.nativeEvent.offsetX
    const progress = (offset / width) * 100
    audio.current.currentTime = (progress / 100) * timeDuration
  },[])
  
  // Ngăn chặn sự kiện nổi bọt
  const onStopNavigate = (e) => {
    e.stopPropagation()
    handleDetailSong(e)
  }

  // Hàm tính toán auto update thanh line chạy cho thời lượng bài hát
  const handleTimeAudio = (currentTime, durationTime) => {   
    let percentValue = (currentTime / durationTime) * 100
    let color = `linear-gradient(90deg, rgb(255,255,255) ${percentValue}%, rgb(130,130,130) ${percentValue}%)`
    setValueInputSong(percentValue)
    inputRangeSong.current.style.background = color
  }

  // Xử lý tăng giảm âm lượng
  const handleChangeInputRangeVolume = (e) => {
    e.stopPropagation()
    const newValueVolume = e.target.value
    setValueVolume(newValueVolume)
    audio.current.volume = newValueVolume
    if(audio.current.volume === 0) {
      setMutedVolume(true)
    } else {
      setMutedVolume(false)
    }
  }
  
  // Xử lý nút bật - tắt âm lượng -> làm thay đổi input range
  const handleMutedVolume = (e) => {
    e.stopPropagation()
    if(mutedVolume === false) {
      setPrevVolume(valueVolume)
      setValueVolume(audio.current.volume = 0)
      setMutedVolume(true)
    } else {
      setValueVolume(prevVolume !== null ? (audio.current.volume = prevVolume) : 0.5)
      setMutedVolume(false)
    }
  }

  // Xử lý thanh input volume khi kéo
  const changeVolume = useCallback(() => {
    const handlePercent = (num) => {
      return (num * 100)
    }
    let volumeInputValue = inputVolume.current.value
    let color = `linear-gradient(90deg, rgb(255,255,255) ${handlePercent(volumeInputValue)}%, rgb(130,130,130) ${handlePercent(volumeInputValue)}%)`
    inputVolume.current.style.background = color
  },[])
  
  useEffect(() => {
    changeVolume()
  },[changeVolume, valueVolume])

  // Xử lý lắng nghe sự kiện bài hát KẾT THÚC
  useEffect(() => {
    const audioElement = audio.current
    const handleAudioEnded = () => {
      dispatch(actions.getInfoSongAction({ activeAudio: false}))
    }
    if(audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded)
    }

    return () => {
      if(audioElement) {
        audioElement.removeEventListener('ended', handleAudioEnded)
      }
    }
  },[context, dispatch])

  // Call API bài hát
  const fetching = useCallback( async () => {
   try {
      const url = `http://localhost:3333/${getSong}`
      const callData = await fetch(url)
      if(!callData.ok) {
        throw new Error(`Fetching ${url} failed`)
      }
      const data = await callData.json()
      setData(data)
    } catch (err) {
      console.log(err)
    }
  },[getSong])

  useEffect(() => {
    fetching()
  },[fetching])
  
  // useEffect(() => {
  //   const handleLoad = () => {
  //     window.addEventListener('load', () => {
  //       if(audio.current) {
  //         audio.current.pause()
  //         dispatch(actions.getInfoSongAction({ activeAudio: false }))
  //         console.log("DOM fully loaded and parsed");
  //       }
  //     })
  //   }
  //   return () =>  window.removeEventListener('load', handleLoad)
  // },[dispatch])

  return (
    <section className={`${state.backgroundControlAudio} ${state.textColor} h-91 fixed bottom-0 flex justify-center w-full xs:hidden lg:block text-white border-t-1 border-zinc-700 z-50`} >
      <div className='w-full h-full text-white pr-5 pl-7 mx-auto flex justify-between items-center cursor-pointer' onClick={handleDetailSong}>
        <div className='flex items-center h-full'>
          <div className='flex items-center min-w-235 max-w-235'>
            <div className='relative shrink-0'>
              <img 
                src={`/mp3/imgMusic/${stateSong.nextSong || stateSong.prevSong ? (data[currentSongIndex].information.thumb) : (stateSong.infoSong.song.information.thumb)}`}
                alt='img'
                className={`w-16 h-16 block object-cover rounded-full ${stateSong.activeAudio && 'animate-spin-rotate'}`}
              />    
                  
            </div>
            <div className='mx-3 flex flex-col '>
              <h3 className='text-sm font-semibold line-clamp-2'>{stateSong.nextSong || stateSong.prevSong ? (data[currentSongIndex].name.song) : (stateSong.infoSong?.song?.name.song)}</h3>
              <span className='text-xs text-zinc-500 font-medium'>{stateSong.nextSong || stateSong.prevSong ? (data[currentSongIndex].name.singer) : (stateSong.infoSong?.song?.name.singer)}</span>
            </div>
          </div>
          <div className='flex items-center mx-4 gap-1 text-white'> 

          <audio 
            ref={audio} 
            src={`/mp3/Music/${stateSong.nextSong || stateSong.prevSong ? (data[currentSongIndex].information.path) : (stateSong.infoSong.song.information.path)}`} 
            volume={valueVolume} 
            loop={activeLoop ? true : false} 
            hidden 
            autoPlay={stateSong.infoSong.song && stateSong.autoPlay ? true : false}
            controls 
            onTimeUpdate={handleTimeUpdateAudio}
          />     

            <BtnRadius onClick={(e) => handleHeart(e)}> 
              {
                activeHeart  ? (<GoHeartFill />) : (<GoHeart />)
              }
            </BtnRadius>
            <BtnRadius>
              <IoIosMore />
            </BtnRadius>
          </div>
        </div>
        <div className='min-w-[800px] text-xl mx-auto flex-col items-center justify-center h-full'>
          <div className='flex items-center text-xl justify-center gap-3 h-12 mt-2'>
            <BtnRadius onClick={handleRandomSong}>
            {console.log('re-render')}
              <LiaRandomSolid className={`${isRandom && 'text-main'}`} />
            </BtnRadius>
            <BtnRadius onClick={handlePrevious}>
              <RxTrackPrevious />
            </BtnRadius>
            <BtnRadius props='hover:bg-transparent'>
                {
                  stateSong.activeAudio
                  ?  (<div className='relative w-[38px] h-[38px] rounded-full border-[1.5px] border-white' onClick={handlePauseSong}>
                        <IoIosPause  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md'/>
                     </div>)
                  :  (<div className='relative w-[38px] h-[38px] rounded-full border-[1.5px] border-white' onClick={handlePlaySong}>
                        <IoIosPlay className='absolute top-1/2 left-1/2 -translate-x-[44%] -translate-y-1/2 text-md'/>
                     </div>)
                }
                {/* (<PiPauseCircleLight onClick={handlePauseSong} className='text-5xl' />) */}
                {/* (<PiPlayCircleLight onClick={handlePlaySong} className='text-5xl' />) */}
            </BtnRadius>
            <BtnRadius onClick={handleNext}>
              <RxTrackNext />
            </BtnRadius>
            <BtnRadius onClick={handleLoop} className='group'>
              {
                activeLoop 
                ? (<div className='relative group'>
                    <RxLoop className=' text-violet ' />
                    <span className='absolute top-0 left-[60%] text-ss group-hover:bg-gray-700 text-violet bg-navBar text-center rounded-full w-9px h-10px leading-3'>1</span>
                  </div>)
                : (<RxLoop />)                            
              }
            </BtnRadius>
          </div>
          <div className='flex items-center justify-center gap-2 h-6'>
            <span id='time-line' className='text-xs text-center min-w-[44px] font-medium text-zinc-400 shrink-0 select-none tracking-widest'>{curTime ? curTime : '0'}</span>
            <div ref={clickSetTimeAudioRef} className='control flex flex-1 items-center cursor-pointer group/parent w-3/4 py-1 ' onClick={handleClickSetTimeAudio}>
              <input 
                    className='w-full' 
                    type='range' 
                    step={0.1} 
                    ref={inputRangeSong}
                    min={minValueInputSong} 
                    max={maxValueInputSong} 
                    value={valueInputSong} 
                    // onClick={handleStopPropagation}
                    onChange={handleTimeAudio}
                  />    
            </div>
            <span id='time-total' className='text-xs text-center min-w-[44px] text-zinc-200 font-medium shrink-0 select-none tracking-widest'>{totalTime ? totalTime : '00:00'}</span>
          </div>
          <div>
            
          </div>
        </div>
        <div className='flex h-full items-center gap-10'>
          <div className='w-full flex relative justify-end items-center gap-3 text-xl after:w-px after:bg-slate-500 after:h-full after:-right-5 after:top-0 after:block after:absolute'>
            <BtnRadius onClick={handleStopPropagation}>
              <GoVideo className='flex-1' />
            </BtnRadius>
            <BtnRadius onClick={handleStopPropagation}>
              <LiaMicrophoneAltSolid className='flex-1' />
            </BtnRadius>
            <BtnRadius onClick={handleStopPropagation}>
              <VscChromeRestore className='flex-1' />
            </BtnRadius>
            <div className='flex items-center flex-1 gap-1'>
                <BtnRadius>
                {
                  mutedVolume 
                  ? (<BiVolumeMute className='flex-1' onClick={handleMutedVolume} />)
                  : (<HiOutlineVolumeUp className='flex-1' onClick={handleMutedVolume} />)
                }
                </BtnRadius>
                <div className='w-[90px] control flex items-center flex-1 cursor-pointer transition-all group/parent' onClick={onStopNavigate} >         
                  <input 
                    className='w-full' 
                    type='range' 
                    ref={inputVolume} 
                    min={minVolume} 
                    max={maxVolume} 
                    step={step} 
                    value={valueVolume} 
                    onClick={handleStopPropagation}
                    onChange={handleChangeInputRangeVolume}
                  />          
                </div>
              </div>
          </div>
          <span onClick={handleOpenSidebarRight}>
            <BtnRadius props='bg-gray-700 rounded-sm p-1'>
              <BsMusicNoteList className='flex-1'/>
            </BtnRadius>
          </span>
        </div>
      </div>
      <div className={`absolute bottom-[101%] left-0 w-240 flex items-center xl:translate-x-0 ${state.backgroundControlAudio || 'bg-main'} ${context.isActiveSidebar === true ? 'sm:translate-x-0' : 'xs:-translate-x-full'} transition-all flex-shrink-0 z-10 mt-auto px-6 gap-2 text-colo font-semibold h-12 cursor-pointer border-solid hover:text-white border-t-1 border-zinc-700`}>
          <BiPlus/> 
          <span className={`${state.textColor} flex-1`}>Tạo playlist mới</span>
      </div>    
               
    </section>
  )
})
export default memo(ControlAudio)