import React, { useContext, useRef, useState } from 'react'
import { Context } from '../context/ContextGlobal'
import BtnRadius from './BtnRadius'
import { BsArrowLeft, BsArrowRight, BsPatchCheckFill, BsSearch } from 'react-icons/bs'
import InputSearch from './InputSearch'
import { FiDownload } from 'react-icons/fi'
import TogglePopup from './TogglePopup'
import { SlSettings } from 'react-icons/sl'
import Modal from './Modal'
import Title from './Title'
import { ImgBackGround } from '../images/images'
import ItemImage from './ItemImage'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import SearchBarMobile from './SearchBarMobile'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actions } from '../redux/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import Account from './Account'
import { fetching, getUser } from '../service'
import { useGetLocalStorage } from '../pages/auth/Login'
import avatarPlaceholder from '../images/avatar-default/avatar.png'



function SearchBar() {
  const context = useContext(Context)
  const navRef = useRef()

  const state = useSelector((state)  => state.backgroundReducer)
  const stateTheme = useSelector((state)  => state.openThemeModalReducer)
  const stateSidebar = useSelector((state)  => state.openSidebarRightReducer)
  const avatarUrl = useSelector((state)  => state.setUserReducer.avatarUrl)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [history, setHistory] = useState([location.pathname])
  const [toggle, setToggle] = useState(false)
  const [checkScroll, setCheckScroll] = useState()


  const handleBack = (e) => {
    e.stopPropagation()
    if(history.length > 1) {
      navigate(-1)
      setHistory(prevHistory => prevHistory.slice(0, -1))
    }
  }

  const handleNext = (e) => {
    e.stopPropagation()
    navigate(1)
  }

  const handleBackGroundGlobal = (item) => {
    dispatch(actions.setThumbAction(item))
  }

  const handleCloseThemeModal = () => {
    dispatch(actions.openThemeModalAction(false))
  }

  const handleOpenAccount = () => {
    if(location.pathname === '/upload') {
      setToggle(false)
    } else {
      setToggle(!toggle)
    }
  }

  useEffect(() => {
    setHistory(prevHistory => {
      if(prevHistory[prevHistory.length - 1] !== location.pathname) {
        return [...prevHistory, location.pathname]
      }
      return prevHistory
    })
  },[location])


  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY   ) {
        setCheckScroll(window.scrollY)
      } else {
        setCheckScroll('')
      }
    }
      window.addEventListener('scroll', handleScroll )

      return () => window.removeEventListener('scroll', handleScroll )
  }, [])



  return (
    <div className='w-full'>
      <Modal classNameMore={`${stateTheme.isOpen ? 'fixed' : 'hidden'} top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-2/4 h-3/4 ${state.backgroundModel} rounded-xl z-40 pb-20 `}>
          <Title title='Giao diện' classNameMore='text-2xl px-30 py-20'/>
          <div className='px-30'>
            <Title title='Nghệ sĩ'/>
            <div className='flex flex-wrap items-center gap-y-4 -mx-2 pt-3 '>
              {
                ImgBackGround.map((item, index) => (
                  <ItemImage
                    key={index} 
                    thumb={item.src} 
                    description={item.desc} 
                    classNameParent='w-1/6 px-2'  
                    classNameMore='text-xs text-white font-medium transition-all'
                    onClick={() => handleBackGroundGlobal(item)}
                    icon={item.link === state.backgroundBody ? <span className='absolute bottom-2 right-2 text-green-500 font-medium bg-transparent p-1 rounded shadow-2xl '><BsPatchCheckFill/></span> : ''}
                  />
                ))
              }
            </div>
          </div>
          <span>
            <AiOutlineCloseCircle className='absolute top-3 right-3 text-white text-3xl cursor-pointer' onClick={handleCloseThemeModal}/>
          </span>
      </Modal> 

      <div ref={navRef} className={`fixed ${stateSidebar.isOpen ? 'pr-[calc(2.9%_+_330px)]' : 'pr-2%9'} ${checkScroll ? `${state.bgNavBar} backdrop-blur-[50px] shadow-navbar` : ''} pl-2%9 flex justify-between gap-x-4 xl:left-60 xs:left-0 right-0 z-30 items-center text-white select-none transition-all duration-300`}>       
              <div className=' flex w-full xs:justify-between'>
              <BtnRadius title='Cài đặt' placement='bottom' classMore='xl:hidden sm:block flex items-center justify-center hover:bg-transparent' onClick={() => context.handleActiveSidebar()}>
                <SlSettings className={`${context.iconSetting} m-auto w-4 min-h-32 object-cover`}/>
              </BtnRadius>
                <div className='flex items-center gap-4 '>
                  <div className='flex gap-1 my-4 text-xl text-current '>
                    <BtnRadius classMore='flex items-center justify-center hover:bg-transparent' onClick={handleBack}>
                      <BsArrowLeft className={`${state.textColor} `}/>
                    </BtnRadius>
                    <BtnRadius classMore='flex items-center justify-center hover:bg-transparent' onClick={handleNext}> 
                      <BsArrowRight className={`${state.textColor}`}/>
                    </BtnRadius>
                  </div>
                  <div className='flex items-center '>
                    <div className='flex items-center justify-center gap-1 relative '>
                      <InputSearch className={`${state.activeTab} ${context.isFocus ? `${state.backgroundModel} rounded-t-xl` : 'rounded-full'}  outline-none h-10 lg:w-440 sm:w-240 xs:w-120 pl-11 xs: pr-5 leading-10 text-white text-sm`}/>
                      <BtnRadius classMore='absolute left-0 top-2/4 px-3 -translate-y-2/4 hover:bg-transparent text-xl flex items-center'>
                        <BsSearch className={`${state.textColor}`} />
                      </BtnRadius>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center justify-center gap-1 xl:min-w-190 xl:block sm:max-w-190 xs:hidden'>
                    <BtnRadius classMore={`${state.backgroundUpdateAccount} flex min-h-40 items-center gap-2 px-5 text-sm text-zinc-400 hover:text-white`}>
                      <FiDownload className='text-white' />
                      <span className={`lg:block xs:hidden text-white`}>Tải bản Windows</span>
                    </BtnRadius>
                  </div>
                  <div className='relative group/popup flex items-center justify-center gap-1'>
                    <BtnRadius classMore='p-3'>
                      <SlSettings  className='w-4 h-4 object-cover'/>
                      <TogglePopup classNameAdd={`${state.backgroundPopupSetting} absolute group-hover/popup:block rounded-sm top-[120%] right-0 after:w-1/4 after:h-4 after:bg-transparent after:-top-4 after:absolute after:right-0`} />
                    </BtnRadius>
                  </div>
                  <div className=''>
                    <BtnRadius title='Tài khoản' placement='bottom' classMore='hover:bg-transparent relative' >
                      <img 
                        src={avatarUrl ? avatarUrl : avatarPlaceholder} 
                        alt='avatar' 
                        className='rounded-full w-10 h-10 object-cover '
                        onClick={handleOpenAccount}
                      />
                      { toggle && <Account /> }
                    </BtnRadius>
                  </div>
                </div>  
              </div>   
      </div>

      <SearchBarMobile />
    </div>
  )
}

export default SearchBar