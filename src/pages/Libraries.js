import React, { useEffect, useState } from 'react'
import ContainerMain from './../components/ContainerMain'
import { IoPlayCircleSharp } from "react-icons/io5";
import { HiPlusSmall } from "react-icons/hi2";
import axios from 'axios';
import { LuMusic } from 'react-icons/lu';
import BtnRadius from './../components/BtnRadius';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonMusic from '../components/Skeleton/SkeletonMusic';
import SkeletonImages from '../components/Skeleton/SkeletonImages';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../api/verifyToken';
import { useGlobalRef } from '../context/ContextGlobal';
import { useQuery } from '@tanstack/react-query';
import instance from '../service/config';


function Libraries() {
  const { audio } = useGlobalRef()
  const [dataMusic, setDataMusic] = useState([])

  const [activeHeart, setActiveHeart] = useState(false)
  const [activeTab, setActiveTab] = useState('Yêu thích')
  const [activeId, setActiveId] = useState()
  const [activeTab2, setActiveTab2] = useState('Bài hát')
  const [path, setPath] = useState('mp3')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [listSong, setListSong] = useState([])
  // const listSong = useSelector(state => state.getListSongReducer.listSong)

  console.log(listSong)
  const buttons1 = [
    'Bài hát',
    'Album',
    'MV',
  ]
  const buttons2 = [
    'Yêu thích',
    'Đã tải lên'
  ]

  const handleHeart = (e, id) => {
    e.stopPropagation()
    setActiveHeart(!activeHeart)
    setActiveId(id)
  }
  const handleClick = e => {
    e.preventDefault()
  }
  const handleGetInfoMusic = (item) => {
    dispatch(actions.getInfoSongAction({ 
      song: item, 
      activeAudio: true, 
      isChanged: false,
    }))
    if(audio.current) {
      audio.current.play()
    }
  }

  const handleActive = (btn) => {
    setActiveTab(btn)
  }
  const handleActive2 = (btn) => {
    setActiveTab2(btn)
  }

  
  // const { data, error } = useQuery({ 
  //   queryKey: ['list-song'],
  //   queryFn: getListSong,
  // })
  // console.log('data-lib', data)

  useEffect(() => {
    const getListSong = async () => {
      try {
        const res = await instance.get('/music/list')
        dispatch(actions.getListSongAction(res.dt))
        setListSong(res.dt)
        // return res.dt
      } catch(e) {
        console.log(e)
      }
    }
    getListSong()
  }, [dispatch]) 

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    },800)
    
  },[path])

  useEffect(() => {
    verifyUser('/auth/libraries', dispatch, navigate)
  }, [dispatch, navigate])

  return (
    <ContainerMain className='flex justify-center w-full text-white'>
      <h1 className='flex items-center gap-2 text-[40px] font-bold text-white'>
        Thư viện
        <IoPlayCircleSharp className='text-xxl' />
      </h1>
      <section className=' mt-[40px]'>
        <h2 className='flex items-center gap-1 font-bold uppercase text-white'>
          Playlist
          <BtnRadius>
            <HiPlusSmall className=''/>
          </BtnRadius>
        </h2>
        <motion.ul 
          className='flex item-center gap-3 text-white mt-5'
        >
          {
            isLoading 
            ? (<SkeletonImages listMusic={5} />)
            : listSong && listSong.length > 0 && (listSong.slice(0,5).map((item, index) => (
                <motion.li key={item.id} className='w-[290px] h-[290px] flex-shrink-0'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1}}
                  transition={{ duration: 0.5 }}
                  >
                    <a href='/' className='block h-full'>
                      <img src={item.thumbnail} alt={item.title} className='w-full h-full object-cover rounded-md' />
                      <h3 className='text-sm font-medium mt-2'>{item.title || <Skeleton />}</h3>
                      <p className='text-xs text-[#ffffff80] mt-1'>{item.artist || <Skeleton />}</p>
                    </a>
                </motion.li>
              ))) 
          }
        </motion.ul>
        <div className='flex items-center gap-7 uppercase text-sm font-medium text-white mt-[96px]'>
          {
            buttons1.map((btn, index) => (
              <button key={index} className={`${activeTab2 === btn ? 'text-[#3560f5]' : ''} min-w-10`} onClick={() => handleActive2(btn)}>{btn}</button>
            ))
          }
          
        </div>
        <div className='flex items-center gap-4 uppercase text-white mt-7'>
          {
            buttons2.map((btn, index) => (
              <button  
                key={index} 
                onClick={() => handleActive(btn)}
                className={`${activeTab === btn ? 'bg-[#3560f5] border-[#3560f5]' : ''} min-w-[87px] h-[25px] px-3 rounded-full text-xs border`}>{btn}</button>
            ))

          }
          
        </div>
        <div>
          <div className='flex items-center uppercase text-[#ffffff80] mt-9'>
            <div className='w-1/2 text-xs font-medium '>
              <h3 className='ml-6'>Bài hát</h3>
            </div>
            <div className='flex-1 text-xs font-medium '>
              <h3>Album</h3>
            </div>
            <div className='ml-3 text-xs font-medium '>
              <h3>Thời gian</h3>
            </div>
          </div>
          <ul className='text-white mt-4 -mx-3'>
            {
              isLoading && listSong.length > 0
              ? (<SkeletonMusic listMusic={listSong && listSong.length > 0 && listSong.length} time />)
              : listSong && listSong.length > 0 && (listSong.map(song => (
                  <li key={song.id} className='px-2 py-2 hover:bg-sidebarRose hover:border-transparent rounded-sm border-t-1 border-b-1 border-[#ffffff0d]' onClick={() => handleGetInfoMusic(song)}>
                    <a href='/' className='flex items-center' onClick={handleClick}>
                      <div className='flex items-center gap-3 w-1/2'>
                        <LuMusic />
                        <div className='w-10 h-10 overflow-hidden rounded-md'>
                          <img src={song.thumbnail} alt='img' className='w-full h-full object-cover' />
                        </div>
                        <div className='capitalize'>
                          <h3 className='text-sm font-medium'>{song.title || <Skeleton />}</h3>
                          <p className='text-xs text-[#ffffff80]'>{song.artist || <Skeleton />}</p>
                        </div>
                      </div>
                      <div className='flex-1 capitalize text-xs text-[#ffffff80]'>
                        <p>{song.album || <Skeleton />}</p>
                      </div>
                      <div className='flex items-center gap-4 text-xs text-[#ffffff80]'>
                        <div onClick={(e) => handleHeart(e, song.id)}> 
                          {
                            activeHeart && activeId === song.id ? (<GoHeartFill />) : (<GoHeart />)
                          }
                        </div>
                        <span>{song.duration}</span>
                      </div>
                    </a>
                  </li>)
                ))
            
            }
          </ul>
        </div>
      </section>
    </ContainerMain>
  )
}

export default Libraries