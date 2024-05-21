import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../ContextGlobal/ContextGlobal'

import ContainerMain from '../../Component/ContainerMain'
import BtnRadius from '../../Component/BtnRadius'

import { FaPlay } from 'react-icons/fa'
import { IoIosMore } from 'react-icons/io'
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { RiArrowUpDownFill, RiUserAddLine } from "react-icons/ri";
import { LiaRandomSolid } from "react-icons/lia";

import img1 from '../../images/slider-1.jpg'
import ItemMusic from './../../Component/ItemMusic';

import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/actions/actions'

function Album() {
  const context = useContext(Context)

  const [activeHeart, setActiveHeart] = useState(false)
  const [data, setData] = useState([])
  const [path, setPath] = useState('mp3')
  
  const color = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
  }

  // const newState = useSelector((state) => state.number)
  const dataState = useSelector((state) => state.activeReducer)
  const dispatch = useDispatch()
  console.log('theme: ', dataState)
  const buttons = ['red', 'green', 'blue', 'pink']
 
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
              <div className='flex items-center text-[13px] text-[#ffffff80] mt-[18px]'>
                {data.length + 1} bài hát - <span>2 tiếng 40 phút</span>
              </div>
          </div> 
        </section> 
        <section className='text-white'>
          <h2 className='text-xl font-bold mt-[49px] capitalize'>Nghệ sĩ tham gia</h2>
          <ul className='flex items-center justify-between mt-5 capitalize'>
            {
              data.slice(0, 5).map((item, i) => (              
                <li key={i} className='flex flex-col items-center justify-center flex-shrink-0 pb-5'>
                  <div className='relative max-w-[290px] h-[290px] rounded-full overflow-hidden cursor-pointer group/parent'>
                    <img src={img1} alt='img' className='w-full h-full group-hover/parent:scale-[1.1] transition-all duration-500 object-cover'/>
                    <span className='absolute inset-0 bg-[#aca7a74d] hidden group-hover/parent:block '></span>
                    <LiaRandomSolid className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 p-2 border border-blue-100 rounded-full z-2 hidden group-hover/parent:block '/>
                  </div>        
                  <h3 className='text-sm mt-4'>{item.name.singer}</h3>0
                  <p className='text-xs text-[#ffffff80] mt-[5px]'>{item.desc.releaseDate}</p>
                  <button className='w-[123px] h-[29px] bg-[#ffffff1a] flex items-center justify-center gap-1 mt-4 text-sm rounded-full' >
                    <RiUserAddLine />
                    <span>Quan tâm</span>
                  </button>
                </li>
              ))
            }
              
             
          </ul>
        </section>
        <section className='text-white capitalize pb-5'>
          <h2 className='mt-12 text-xl font-bold'>Có thể bạn quan tâm</h2>
          <ul className='flex items-center justify-between mt-5 '>
            { 
              data.slice(0,5).map((item, i) => (
                <li key={i} className='text-sm flex-shrink-0'>
                  <div className='max-w-[290px] h-[290px] rounded-md overflow-hidden '>
                    <img src={img1} alt='img' className='w-full h-full hover:scale-[1.1] transition-all duration-500 object-cover cursor-pointer'/>
                  </div>
                  <h3 className='font-bold mt-3'>{item.name.song}</h3>
                  <p className='text-[#ffffff80] mt-1'>{item.information.album}</p>
                </li>
              ))
            }
          </ul>
        </section>

        <div className='text-white'>
          <h2 className={`${color[dataState.activeIndex]}`}>Text</h2>
          <div className='flex gap-3'>
            {
              buttons.map((btn, index) => (
                 <button key={index} className={`${dataState.activeIndex === btn ? 'text-violet' : ''} border border-yellow-200 bg-slate-800`} onClick={() => dispatch(actions.btnActiveAction(btn))}>{btn}</button>
              ))
            }
          </div>
        </div>
    </ContainerMain>    

  )
}

export default Album