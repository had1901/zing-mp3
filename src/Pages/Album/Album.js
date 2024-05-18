import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../ContextGlobal/ContextGlobal'

import ContainerMain from '../../Component/ContainerMain'
import BtnRadius from '../../Component/BtnRadius'

import { FaPlay } from 'react-icons/fa'
import { IoIosMore } from 'react-icons/io'
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { RiArrowUpDownFill } from "react-icons/ri";

import img1 from '../../images/slider-1.jpg'
import { Musics } from '../../mp3/Music/Music'
import ItemMusic from './../../Component/ItemMusic';

function Album() {
  const context = useContext(Context)
  const [activeHeart, setActiveHeart] = useState(false)
  const [data, setData] = useState([])
  const [path, setPath] = useState('mp3')
  const handleHeart = (e) => {
    e.stopPropagation()
    setActiveHeart(!activeHeart)
  }
  useEffect(() => {
    const fetching = async () => {
      try {
        const api = `http://localhost:3333/${path}`
        const res = await fetch(api)
        if(res.status !== 200) {
          throw new Error ('Fetching false')
        }
        const result = await res.json()
        setData(result)
      } catch (err) {
        console.log(err)
      }
    }
    fetching()
  },[path])
  return (
    <ContainerMain>  
        <section className='flex gap-5 text-white'>
          <div className='w-[300px] text-center'> 
            <div className='rounded-2xl overflow-hidden'>
              <img src={img1} alt='img' className='w-full h-[300px] object-cover mx-auto block hover:scale-[1.1] transition duration-500 cursor-pointer'/>
            </div>
            <h2 className='mt-3 px-[6px] text-[20px] font-bold leading-[30px]'>Acoustic</h2>
            <p className='px-[6px] text-xs text-[#ffffff80] leading-[21px]'>Cập nhật: 28/03/2024</p>
            <p className='px-[6px] text-xs text-[#ffffff80] leading-[21px]'>Hoàng Duyên, Dương Edward, LyLy, Lưu Hương Giang</p>
            <p className='px-[6px] text-xs text-[#ffffff80] leading-[21px]'>22k người yêu thích</p>
            <BtnRadius props={`min-h-40 items-center gap-2 px-5 mt-4 text-sm text-zinc-400 hover:bg-transparent`}>
              <span className={`flex justify-center items-center gap-3 min-w-[200px] h-[40px] uppercase rounded-full bg-[#ffffff0d] ${context.iconDownLoad}`}>
                <FaPlay /> 
                <span>Tiếp tục phát</span>
              </span>
            </BtnRadius>
            <div className='flex gap-4 mt-4 justify-center items-center'>
            <BtnRadius onClick={(e) => handleHeart(e)} props='bg-[#ffffff0d]'>
                {
                  activeHeart  ? (<GoHeartFill />) : (<GoHeart />)
                }
              </BtnRadius>
              <BtnRadius props='bg-[#ffffff0d]'>
                <IoIosMore />
              </BtnRadius>
            </div>
          </div>  
          <div className='flex-1 text-sm'>
              <h3 className='text-[#ffffff80]'>
                Lời tựa
                <span className='text-white ml-2'>Rót mật vào tai cùng những thanh âm Acoustic nhẹ nhàng</span>
              </h3>
              <div className='flex items-center w-full text-[#ffffff80] mt-4 gap-x-4'>                  
                <h4 className='w-[50%] flex items-center'>
                  <RiArrowUpDownFill />
                  <span className='ml-3'>Bài hát</span>
                </h4>
                <h4 className='w-[40%]'>Album</h4>
                <h4 className='flex-1 text-end whitespace-nowrap'>Thời gian</h4>    
              </div>
              <div className='mt-2 border-b-1 border-b-[#ffffff1a]'>
              { 
                data.map((item, index) => (
                  <div key={index} className='flex items-center'>
                    <ItemMusic key={index} isAlbum isTimeString item={item} className='w-full rounded-[4px] hover:bg-searchRose cursor-pointer' classWrap='flex flex-1 justify-between rounded-[4px] border-b-1 border-b-[#ffffff1a]' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'/> 
                  </div>                     
                )) 
              }
              </div>
          </div> 
        </section> 
    </ContainerMain>    

  )
}

export default Album