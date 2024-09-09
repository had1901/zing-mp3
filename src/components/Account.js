import React, { useEffect, useState } from 'react'
import avatarPlaceholder from '../images/avatar-default/avatar.png'
import { MdBlockFlipped } from "react-icons/md";
import { HiOutlineUpload } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { handleLogout, logout } from '../service';
import { actions } from '../redux/actions';
import { IoCameraReverseOutline } from "react-icons/io5";

function Account() {
    const state = useSelector(state => state.backgroundReducer)
    const user = useSelector(state => state.setUserReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChangeAvatar = (e) => {
        console.log(e.target.file[0])
    }
    
  return (     
       <AnimatePresence>
            <motion.div className={`${state.backgroundPopupSetting} w-[300px] absolute top-[115%] right-0 ${state.textColor} rounded-md h-[720px] shadow-account overflow-y-auto overscroll-y-contain`}
                layout 
                transition={{ duration: 2 }}
            >
                <div className='p-3'>
                    <div className='flex items-center gap-3'>
                        <img src={user.avatarUrl ? user.avatarUrl : avatarPlaceholder} alt='img' className='w-16 h-16 rounded-full object-cover'/>
                        <div className='font-bold'>
                            <Link to={!user.username && '/login'}>{user.username ? user.username : !user.isLogging && 'Đăng nhập'} </Link>
                            <p className='bg-[#a1a1a1] w-12 text-center text-xs px-1 py-[2px] mt-1 rounded-md font-semibold'>Basis</p>
                        </div>
                    </div>
                    <button className='bg-[#ffffff1a] w-full py-2 mt-4 text-sm rounded-full text-center'>Nâng cấp tài khoản</button>
                    <div>
                        <h3 className='text-left mt-4 mb-3 '>Nâng cấp gói</h3>
                        <div className={`bg-[#ede3ff] rounded-xl p-5 shadow-account ${state.textColor}`}>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-bold text-2xl text-[#9457ff]'>Zing mp3</h3>
                                <span className='w-14 rounded-md text-center px-2  bg-[#9457ff] '>Plus</span>                         
                            </div>
                            <p className='text-base text-[#141414] mt-3'>Chỉ từ 13,000đ/tháng</p>
                            <p className='text-sm text-[#141414cc] mt-1'>Nghe nhạc với chất lượng cao nhất, không quảng cáo</p>
                            <button className='w-44 h-9 text-center font-semibold text-[13px] bg-[#9457ff] mt-4 rounded-full'>Tìm hiểu thêm</button>
                        </div>
                    </div>
                    <div>
                        <div className={`bg-[#f8edd1] rounded-xl p-5 shadow-account ${state.textColor} mt-5`}>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-bold text-2xl text-[#dca519]'>Zing mp3</h3>
                                <span className='w-14 rounded-md text-center px-2  bg-[#dca519]'>Plus</span>                         
                            </div>
                            <p className='text-base text-[#141414] mt-3'>Chỉ từ 13,000đ/tháng</p>
                            <p className='text-sm text-[#141414cc] mt-1'>Nghe nhạc với chất lượng cao nhất, không quảng cáo</p>
                            <button className='w-44 h-9 text-center font-semibold text-[13px] bg-[#dca519] mt-4 rounded-full'>Tìm hiểu thêm</button>
                        </div>
                    </div>
                    <div className='before:mt-4 before:block before:w-4/5 before:h-[1px] before:bg-[#ffffff1a] '>
                        <div className='py-3 '>
                            <h3 className='font-bold text-left'>Cá nhân</h3>
                            <div className='flex items-center gap-3 mt-2 p-2 hover:bg-[#ffffff1a] rounded-md cursor-pointer'>
                                <MdBlockFlipped className='text-xl'/>
                                <span>Danh sách chặn</span>
                            </div>
                            {   
                                user.isLogging && user.group.group_name === 'admin' &&
                                <Link to='/upload' className='flex items-center gap-3 p-2 hover:bg-[#ffffff1a] rounded-md cursor-pointer'>
                                    <HiOutlineUpload className='text-xl'/>
                                    <span>Tải lên</span>
                                </Link>
                            }
                        </div>
                    </div>
    
                    <div className=' before:block before:w-4/5 before:h-[1px] before:bg-[#ffffff1a]'>
                        <div onClick={() => handleLogout(dispatch, actions, navigate)} className='flex items-center gap-3 p-2 mt-2 hover:bg-[#ffffff1a] rounded-md cursor-pointer'>
                            <MdLogout className='text-xl'/>
                            <span>Đăng xuất</span>
                        </div>
                    </div>
        
                </div>
            </motion.div>
       </AnimatePresence>
  )
}

export default Account