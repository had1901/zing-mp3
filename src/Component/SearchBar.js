import React, { useContext, useState } from 'react'
import { Context } from '../ContextGlobal/ContextGlobal'
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
import { actions } from '../redux/actions/actions'
import { middleware } from '../redux/reducer/reducer'
import { useLocation, useNavigate } from 'react-router-dom'
import Account from './Account'


function SearchBar() {
  const context = useContext(Context)
  const state = useSelector((state)  => state.backgroundReducer)
  const stateTheme = useSelector((state)  => state.openThemeModalReducer)
  const stateSidebar = useSelector((state)  => state.openSidebarRightReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [history, setHistory] = useState([location.pathname])
  const [toggle, setToggle] = useState(false)
  
  const handleBack = (e) => {
    e.stopPropagation()
    if(history.length > 1) {
      navigate(-1)
      setHistory(prevHistory => prevHistory.slice(0, -1))
    }
  }

  const handleNext = (e) => {
    e.stopPropagation()
    // const currentIndex = history.indexOf(location.pathname)
    // if(currentIndex < history.length - 1) {
    // }  
    navigate(1)
  }

  const handleBackGroundGlobal = (item) => {
    dispatch(middleware.setThumbMiddleware(item))
  }

  const handleCloseThemeModal = () => {
    dispatch(actions.openThemeModalAction(false))
  }
  const handleOpenAccount = () => {
    // dispatch(actions.openAccountPopupAction(false))
    setToggle(!toggle)
  }

  useEffect(() => {
    setHistory(prevHistory => {
      if(prevHistory[prevHistory.length - 1] !== location.pathname) {
        return [...prevHistory, location.pathname]
      }
      return prevHistory
    })
  },[location])


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

      <div className={`fixed ${state.backgroundSearchBar} ${stateSidebar.isOpen ? 'pr-[calc(2.9%_+_330px)]' : 'pr-2%9'} pl-2%9 flex justify-between gap-x-4 xl:left-60 xs:left-0 right-0 z-30 items-center text-white select-none transition-all duration-300`}>       
              <div className=' flex w-full xs:justify-between'>
              <BtnRadius props='xl:hidden sm:block flex items-center justify-center hover:bg-transparent' onClick={() => context.handleActiveSidebar()}>
                <SlSettings className={`${context.iconSetting} m-auto w-4 min-h-32 object-cover`}/>
              </BtnRadius>
                <div className='flex items-center gap-4 '>
                  <div className='flex gap-1 my-4 text-xl text-current '>
                    <BtnRadius props='flex items-center justify-center hover:bg-transparent' onClick={handleBack}>
                      <BsArrowLeft className={`${state.textColor} `}/>
                    </BtnRadius>
                    <BtnRadius props='flex items-center justify-center hover:bg-transparent' onClick={handleNext}> 
                      <BsArrowRight className={`${state.textColor}`}/>
                    </BtnRadius>
                  </div>
                  <div className='flex items-center '>
                    <div className='flex items-center justify-center gap-1 relative '>
                      <InputSearch className={`${state.activeTab} outline-none rounded-full h-10 lg:w-440 sm:w-240 xs:w-120 pl-11 xs: pr-5 leading-10 ${context.inputPlaceHolder} text-white text-sm`}/>
                      <BtnRadius props='absolute left-0 top-2/4 px-3 -translate-y-2/4 hover:bg-transparent text-xl flex items-center'>
                        <BsSearch className={`${state.textColor}`} />
                      </BtnRadius>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center justify-center gap-1 xl:min-w-190 xl:block sm:max-w-190 xs:hidden'>
                    <BtnRadius ref={context.buttonDownLoadRef} props={`${context.btnDownLoad} ${state.backgroundUpdateAccount} flex min-h-40 items-center gap-2 px-5 text-sm text-zinc-400 hover:text-white`}>
                      <FiDownload className='text-white' />
                      <span className={`lg:block xs:hidden text-white`}>Tải bản Windows</span>
                    </BtnRadius>
                  </div>
                  <div className='relative group/popup flex items-center justify-center gap-1'>
                    <BtnRadius props={`${context.btnDownLoad} p-3`}>
                      <SlSettings className={`${context.iconSetting} w-4 h-4 object-cover`}/>
                      <TogglePopup refElement={context.sectionElement} classNameAdd={`${state.backgroundPopupSetting} absolute group-hover/popup:block rounded-sm top-[120%] right-0 after:w-1/4 after:h-4 after:bg-transparent after:-top-4 after:absolute after:right-0`} />
                    </BtnRadius>
                  </div>
                  <div className=''>
                    <BtnRadius props='hover:bg-transparent relative' >
                      <img 
                        src='/images/avatar-jisoo.jpg' 
                        alt='avatar' 
                        className='rounded-full w-9 h-9 object-cover '
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