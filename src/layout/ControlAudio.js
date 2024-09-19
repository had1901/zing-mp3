/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { GoHeart, GoHeartFill, GoVideo } from 'react-icons/go';
import { IoIosMore, IoIosPause, IoIosPlay } from 'react-icons/io';
import { LiaMicrophoneAltSolid, LiaRandomSolid, } from 'react-icons/lia';
import { VscChromeRestore } from 'react-icons/vsc';
import { HiOutlineVolumeUp } from 'react-icons/hi';
import { BiVolumeMute } from "react-icons/bi";
import { BsMusicNoteList } from 'react-icons/bs';
import { RxTrackPrevious, RxTrackNext, RxLoop } from 'react-icons/rx';

import BtnRadius from './../components/BtnRadius';
import { Context, useGlobalRef } from '../context/ContextGlobal';

import 'react-loading-skeleton/dist/skeleton.css'
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions';
import usePictureInPicture from 'react-use-pip'
import instance from '../service/config';
import { Spin } from "antd"

const ControlAudio = memo(() => {
  const { audio, isLoadMetaAudio, setIsLoadMetaAudio, play, setPlay } = useGlobalRef()

  const inputVolume = useRef()
  const inputRangeSong = useRef()
  const ref = useRef()
  const btnPlayRef = useRef()
  const context = useContext(Context)
  const step = 0.01

  const navigate = useNavigate()
  const [data, setData] = useState([])
  
  const [prevVolume, setPrevVolume] = useState(0.5)
  const [valueInputSong, setValueInputSong] = useState(0)
  const [valueVolume, setValueVolume] = useState(0.5)
  const [minVolume, setMinVolume] = useState(0)
  const [maxVolume, setMaxVolume] = useState(1)
  const [mutedVolume, setMutedVolume] = useState(null)
  const [storeRange, setStoreRange] = useState(() => {
    const songInit = localStorage.getItem('playing')
      if(songInit) {
        return JSON.parse(songInit)
      } else {
        return null
      }
    })
  const [activeHeart, setActiveHeart] = useState(false)
  const [activeLoop, setActiveLoop] = useState(false)
  const [curTime, setCurTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isRandom, setIsRandom] = useState(false)
  const [isChangeSong, setIsChangeSong] = useState(false)

  const state = useSelector(state => state.backgroundReducer)
  const thumb = useSelector((state) => state.backgroundReducer.backgroundBody)
  const stateSong = useSelector(state => state.getInfoSongReducer)
  const songsSuggest = useSelector(state => state.getListSongReducer.listSong)
  const openSidebarRight = useSelector(state => state.openSidebarRightReducer.isOpen)
  const dispatch = useDispatch()
  const {isPictureInPictureActive, isPictureInPictureAvailable, togglePictureInPicture} = usePictureInPicture(audio, {
    onEnterPictureInPicture: (e) => {
      console.log('enter-pip: ',e)
    },
    onLeavePictureInPicture: (e) => {
      console.log('leave-pip: ',e)
    }
  })

  // Hàm update thời lượng khi bài hát đang phát
  const handleTimeUpdateAudio = useCallback(() => {
      if(audio.current) {
        const duration = audio.current.duration // Lấy ra tổng thời gian của bài hát
        const currentTime = audio.current.currentTime // Lấy ra thời gian hiện tại của bài hát ( đang phát )
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
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    // Định dạng phần phút và phần giây thành chuỗi với đủ số chữ số
    const minutesString = String(minutes).padStart(2, '0')
    const secondsString = String(remainingSeconds).padStart(2, '0')
    // Kết hợp thành biểu thức thời gian dạng "00:00 phút
    const timeExpression = `${minutesString}:${secondsString}`

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
  const handleStopPropagation = useCallback((e) => {
    e.stopPropagation()
  },[])

  // Yêu thích bài hát
  const handleHeart = useCallback((e) => {
    e.stopPropagation()
    setActiveHeart(prev => !prev)
  },[])

  // Bài hát ngẫu nhiên
  const handleRandomSong = useCallback((e) => {
    e.stopPropagation()
    setIsRandom(!isRandom)
  },[isRandom])

  // Chuyển bài hát trước đó
  const handlePrevious = useCallback(async (e) => {
    e.stopPropagation()
    if(isRandom) {
      setCurrentSongIndex(Math.floor(Math.random() * songsSuggest.length))
    } 
    if(songsSuggest) {
      setCurrentSongIndex(prevIndex => {
        if(prevIndex > 0) {
          return prevIndex - 1
        } else {
          return 0
        }
      })
      audio.current.currentTime = 0
      setValueInputSong(0)
      setIsChangeSong(true)
    }
  },[isRandom, songsSuggest, dispatch])

  // Chuyển bài hát tiếp theo
  const handleNext = useCallback(async (e) => {
    e.stopPropagation()
    if(isRandom) {
      setCurrentSongIndex(Math.floor(Math.random() * songsSuggest.length))
    } 
    if(songsSuggest) {
      setCurrentSongIndex(prevIndex => {
        if(prevIndex < songsSuggest.length - 1) {
          return prevIndex + 1
        } else {
          return prevIndex
        } 
      })
      audio.current.currentTime = 0
      setValueInputSong(0)
      setIsChangeSong(true)
    }
  },[isRandom, songsSuggest, dispatch])

  // Vòng lặp phát lại bài hát
  const handleLoop = useCallback((e) => {
    e.stopPropagation()
    setActiveLoop(!activeLoop)
  },[activeLoop])

  // Điều hướng page album của bài hát đang phát
  const handleDetailSong = useCallback(() => {
    navigate(`/album/${stateSong.song.album}`)
  },[navigate, stateSong])

  // Đóng mở menu bên phải
  const handleOpenSidebarRight = useCallback((e) => {
    e.stopPropagation()
    console.log(111)
    dispatch(actions.openSidebarRightAction(!openSidebarRight))
  },[])

  // Phát bài hát
  const handlePlaySong = useCallback(async (e) => {
    e.stopPropagation()
    handleTimeUpdateAudio()
    try {
        setIsLoadMetaAudio(false)
        setPlay(true)
        audio.current.play()
    } catch (err) {
      console.log('Audio play', err)
    }
  },[dispatch, handleTimeUpdateAudio])

  // Tạm dừng bài hát
  const handlePauseSong = useCallback(async (e) => {
    e.stopPropagation()
    handleTimeUpdateAudio()
    try {
      setIsLoadMetaAudio(false)
      setPlay(false)
      audio.current.pause()
    } catch (err) {
      console.log('Audio pause', err)
    }
  },[dispatch, handleTimeUpdateAudio])
  
  // Ngăn chặn sự kiện nổi bọt
  const onStopNavigate = useCallback((e) => {
    e.stopPropagation()
    handleDetailSong(e)
  },[handleDetailSong])

  // Hàm event change value input
  const handleInputAudio = (e) => {
    e.stopPropagation()
    if(audio.current) {
      let percentValue = (inputRangeSong.current.value / parseInt(audio.current.duration)) * 100
      let color = `linear-gradient(90deg, rgb(255,255,255) ${percentValue}%, rgb(130,130,130) ${percentValue}%)`
      inputRangeSong.current.style.background = color
      audio.current.currentTime = inputRangeSong.current.value
      setValueInputSong(parseFloat(inputRangeSong.current.value))
    }
  }

  // Hàm tính toán auto update thanh line chạy cho thời lượng bài hát
  const handleTimeAudio = (currentTime, durationTime) => {
    let percentValue = (currentTime / durationTime) * 100
    let color = `linear-gradient(90deg, rgb(255,255,255) ${percentValue}%, rgb(130,130,130) ${percentValue}%)`
    inputRangeSong.current.style.background = color
    setValueInputSong(parseFloat(audio.current.currentTime))
  }

  // PiP
  const handlePictureInPicture = useCallback((e) => {
    e.stopPropagation()
    togglePictureInPicture(!isPictureInPictureActive)
  },[togglePictureInPicture, isPictureInPictureActive])

  // Xử lý tăng giảm âm lượng
  const handleChangeInputRangeVolume = useCallback((e) => {
    e.stopPropagation()
    const newValueVolume = e.target.value
    setValueVolume(newValueVolume)
    audio.current.volume = newValueVolume
    if(audio.current.volume === 0) {
      setMutedVolume(true)
    } else {
      setMutedVolume(false)
    }
  },[])
  
  // Xử lý nút bật - tắt âm lượng -> làm thay đổi input range
  const handleMutedVolume = useCallback((e) => {
    e.stopPropagation()
    if(audio){
      if(mutedVolume === false) {
        setPrevVolume(valueVolume)
        setValueVolume(audio.current.volume = 0)
        setMutedVolume(true)
      } else {
        setValueVolume(prevVolume !== null ? (audio.current.volume = prevVolume) : 0.5)
        setMutedVolume(false)
      }
    }
  },[mutedVolume, valueVolume])

  // const onPauseSong = () => {
  //   console.log('pause---song')
  //   if(stateSong.prevSong || stateSong.nextSong) {
  //     return
  //   }
  //   dispatch(actions.getInfoSongAction({...stateSong, activeAudio: false}))

  // }
  // const onPlaySong = () => {
  //   console.log('play---song')
  //   if(stateSong.prevSong || stateSong.nextSong) {
  //     return
  //   }
  //   dispatch(actions.getInfoSongAction({...stateSong, activeAudio: true}))

  // }

  // Hàm tính tổng thời gian của audio
  // useEffect(() => {
  // const durationAudio = (seconds) => {
  //   const minutes = Math.floor(seconds / 60)
  //   const remainingSeconds = seconds % 60
  //   // Định dạng phần phút và phần giây thành chuỗi với đủ số chữ số
  //   const minutesString = String(minutes).padStart(2, '0')
  //   const secondsString = String(remainingSeconds).padStart(2, '0')
  //   // Kết hợp thành biểu thức thời gian dạng "00:00 phút
  //   const timeExpression = `${minutesString}:${secondsString}`
  //   console.log('timeExpression', timeExpression)

  //   return timeExpression
  // }

  // audio.current.duration && setDuration(durationAudio(Math.floor(audio.current.duration)))
  // },[audio])

  
  // Call API
  // Lấy danh sách bài hát gợi ý
  useEffect(() => {
    const fetchingAllSong = async () => {
      try {
        const res = await instance.post('/music/songs', { genre: 'all' })
        setData(res.dt)
      } catch (e) {
        console.log(e)
      }
    }
    fetchingAllSong()
  },[])
  
  // Xử lý lắng nghe sự kiện bài hát KẾT THÚC
  useEffect(() => {
    const audioElement = audio.current
    const handleAudioEnded = () => {
      setPlay(false)
    }
    if(audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded)
    }

    return () => {
      if(audioElement) {
        audioElement.removeEventListener('ended', handleAudioEnded)
      }
    }
  },[dispatch, stateSong, audio.current])

  // Thêm CSS styles cho change theme
  useEffect(() => {
    const element = ref.current
    if(element) {
      if(thumb) {
        element.classList.add(state.backgroundControlAudio)
        element.classList.add('body-animate')
  
      } else {
        element.classList.remove(state.backgroundControlAudio)
        element.classList.remove('body-animate')
      }
      return () => {
        element.classList.remove(state.backgroundControlAudio)
        element.classList.remove('body-animate')
      }
    }

  },[thumb, state])
  
  // Xử lý volume khi kéo
  useEffect(() => {
    const changeVolume = () => {
      const handlePercent = (num) => {
        return (num * 100)
      }
      if(inputVolume.current) {
        let volumeInputValue = inputVolume?.current.value
        let color = `linear-gradient(90deg, rgb(255,255,255) ${handlePercent(volumeInputValue)}%, rgb(130,130,130) ${handlePercent(volumeInputValue)}%)`
        inputVolume.current.style.background = color
      }
    }
    changeVolume()
  },[valueVolume])
  
  // Chuyển bài hát theo index và lưu vào redux store
  useEffect(() => {
    const handleCanPlay = () => {
      setIsLoadMetaAudio(false)
      setPlay(true)
      audio.current.play()
    }
    if(audio.current) {
      audio.current.currentTime = 0
    }
    if(isChangeSong) {
      if(audio.current) {
        setIsLoadMetaAudio(true)
        audio.current.load()
        
        audio.current.addEventListener('canplay', handleCanPlay)
      }
      dispatch(actions.getInfoSongAction({
        ...stateSong, 
        song: {
          ...songsSuggest[currentSongIndex]
        },
      }))
      setIsChangeSong(false)
    }
    return () => {
      if (audio.current) {
        audio.current.removeEventListener('canplay', handleCanPlay)
      }
    }
  } ,[currentSongIndex])

  // Lấy ra bài hát nghe trước đó trong LocalStorange khi truy cập lại App
  useEffect(() => {
    const songInit = localStorage.getItem('playing')
    if(songInit === 'undefined' || songInit === null) {
      return 
    } else {
      try {
        const parseSongInit = JSON.parse(songInit) 
        if(parseSongInit && typeof parseSongInit === 'object' && parseSongInit !== null) {
          dispatch(actions.getInfoSongAction({
            ...stateSong,
            song: {
              ...parseSongInit
            }
          }))
        } else {
          throw new Error('Parsed initSong is not a valid object')
        }
      } catch (e) {
        console.log('catch music', e)
      }
    }
  },[])

    if(context.player || storeRange){
      return (
          <section ref={ref} className={` ${state.textColor} ${state.backgroundControlAudio ? state.backgroundControlAudio : 'bg-primary'} h-91 fixed bottom-0 flex justify-center w-full xs:hidden lg:block  text-white border-t-1 border-zinc-700 z-50`} >
            <div className='w-full h-full text-white pr-5 pl-7 mx-auto flex justify-between items-center cursor-pointer' onClick={handleDetailSong}>
              <div className='flex items-center h-full'>
                <div className='flex items-center min-w-235 max-w-235'>
                  <div className='relative shrink-0'>
                    <img 
                      src={stateSong.song.thumbnail && stateSong.song.thumbnail}
                      alt='img'
                      className={`w-16 h-16 block object-cover rounded-full 
                        ${audio.current && audio.current.currentTime > 0 && !audio.current.paused && !audio.current.ended && audio.current.readyState > audio.current.HAVE_CURRENT_DATA && 'animate-spin-rotate'}`}
                    />    
                  </div>
                  <div className='mx-3 flex flex-col '>
                    <h3 className='text-sm font-semibold line-clamp-2'>{stateSong.song.title && stateSong.song.title}</h3>
                    <span className='text-xs text-zinc-500 font-medium'>{stateSong.song.artist && stateSong.song.artist}</span>
                  </div>
                </div>
                <div className='flex items-center mx-4 gap-1 text-white'> 
                
                <audio 
                  ref={audio} 
                  src={stateSong.song.url && stateSong.song.url} 
                  volume={valueVolume} 
                  loop={activeLoop ? true : false} 
                  hidden 
                  controls 
                  autoPlay={false}
                  onTimeUpdate={handleTimeUpdateAudio}
                />     
                  <BtnRadius title={activeHeart ? 'Xóa yêu thích' : 'Yêu thích'} placement='top' onClick={handleHeart}> 
                    { activeHeart ? (<GoHeartFill />) : (<GoHeart />) }
                  </BtnRadius>

                  <BtnRadius title='Xem thêm' placement='top'>
                    <IoIosMore />
                  </BtnRadius>
                </div>
              </div>
              <div className='min-w-[800px] text-xl mx-auto flex-col items-center justify-center h-full'>
                <div className='flex items-center text-xl justify-center gap-3 h-12 mt-2'>
                  <BtnRadius title='Phát ngẫu nhiên' placement='top' onClick={handleRandomSong}>
                    <LiaRandomSolid className={`${isRandom && 'text-main'}`} />
                  </BtnRadius>
                  <BtnRadius onClick={handlePrevious}>
                    <RxTrackPrevious />
                  </BtnRadius>
                  <BtnRadius title={play ? 'Tạm dừng' : 'Phát bài hát'} placement='top' classMore='hover:bg-transparent'>
                      {play
                        ?  (<div className='relative w-[38px] h-[38px] rounded-full border-[1.5px] border-white' onClick={handlePauseSong}>
                              {isLoadMetaAudio
                                ? <Spin size='small' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md' />
                                : <IoIosPause  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md'/>
                              }
                          </div>)
                        :  (<div ref={btnPlayRef} className='relative w-[38px] h-[38px] rounded-full border-[1.5px] border-white' onClick={handlePlaySong}>
                              <IoIosPlay className='absolute top-1/2 left-1/2 -translate-x-[44%] -translate-y-1/2 text-md'/>
                          </div>)
                      }
                  </BtnRadius>
                  <BtnRadius onClick={handleNext}>
                    <RxTrackNext />
                  </BtnRadius>
                  <BtnRadius title={activeLoop ? 'Tắt phát lại' : 'Bật phát lại một bài'} placement='top' onClick={handleLoop} className='group'>
                    {activeLoop 
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
                  <div className='control flex flex-1 items-center cursor-pointer group/parent w-3/4 py-1 ' >
                    <input 
                      className='input-range-song w-full' 
                      type='range' 
                      step={0.1} 
                      ref={inputRangeSong}
                      min={0} 
                      max={audio?.current?.duration || 100} 
                      value={valueInputSong} 
                      onInput={handleInputAudio}
                    />    
                  </div>
                  <span id='time-total' className='text-xs text-center min-w-[44px] text-zinc-200 font-medium shrink-0 select-none tracking-widest'>{totalTime ? totalTime : '00:00'}</span>
                </div>
              </div>
              <div className='flex h-full items-center gap-10'>
                <div className='w-full flex relative justify-end items-center gap-3 text-xl after:w-px after:bg-slate-500 after:h-full after:-right-5 after:top-0 after:block after:absolute'>
                  <BtnRadius title='Xem MV' placement='top' onClick={handleStopPropagation}>
                    <GoVideo className='flex-1' />
                  </BtnRadius>
                  <BtnRadius title='Xem lời bài hát' placement='top' onClick={handleStopPropagation}>
                    <LiaMicrophoneAltSolid className='flex-1' />
                  </BtnRadius>
                  <BtnRadius title='Thu nhỏ' placement='top' onClick={handlePictureInPicture}>
                    <VscChromeRestore className={`${isPictureInPictureAvailable && 'text-red-300'} flex-1`} />
                  </BtnRadius>
                  <div className='flex items-center flex-1 gap-1'>
                      <BtnRadius>
                      {mutedVolume 
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
                <BtnRadius onClick={handleOpenSidebarRight} title='Danh sách phát' placement='top' classMore='bg-gray-700 rounded-sm p-1'>
                  <BsMusicNoteList className='flex-1'/>
                </BtnRadius>
              </div>
            </div>
            <div className={`absolute bottom-[101%] left-0 w-240 flex items-center xl:translate-x-0 ${state.backgroundControlAudio || 'bg-main'} ${context.isActiveSidebar === true ? 'sm:translate-x-0' : 'xs:-translate-x-full'} transition-all flex-shrink-0 z-10 mt-auto px-6 gap-2 text-colo font-semibold h-12 cursor-pointer border-solid hover:text-white border-t-1 border-zinc-700`}>
              <BiPlus/> 
              <span className={`${state.textColor} flex-1`}>Tạo playlist mới</span>
            </div>    
          </section>
      )
    } else {
      return <></>
    }
    
  
  
})
export default memo(ControlAudio)